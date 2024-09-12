import { tryCatch } from "../middlewares/error.js";
import {Bed}  from "../models/bedModel.js";
import mongoose from "mongoose";
import ErrorHandler from "../utils/utilityClass.js";
import {PatientAdmission} from "../models/patientAdmissionModel.js";
import { Inventory } from "../models/inventoryModel.js";




export const getHospitalStats = tryCatch(async(req,res,next)=>{
    const { hospitalId } = req.query;
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    // Validate hospital ID
    if (!hospitalId) {
        return next(new ErrorHandler("Hospital ID is required", 400));
    }

  const totalAllocatedBedsPromise = Bed.countDocuments({hospitalId,isOccupied:true});
  const allocatedBedsICUPromise = Bed.countDocuments({hospitalId,isOccupied:true,department:'ICU'});
  const allocatedBedsGeneralPromise = Bed.countDocuments({hospitalId,isOccupied:true,department:'General'});
  const allocatedBedsEmergencyPromise = Bed.countDocuments({hospitalId,isOccupied:true,department:'Emergency'});

  // Aggregate the total and available beds for each department
  const bedStatsPromise = await Bed.aggregate([
    {
      $match: {
        hospitalId: new mongoose.Types.ObjectId(hospitalId),
      },
    },
    {
      $group: {
        _id: "$department",
        totalBeds: { $sum: 1 }, // Total beds per department
        availableBeds: { $sum: { $cond: [{ $eq: ["$isOccupied", false] }, 1, 0] } }, // Available beds
      },
    },
    {
      $project: {
        _id: 0,
        department: "$_id",
        totalBeds: 1,
        availableBeds: 1,
      },
    },
  ]);
  const getLastThreeMonthsPatientsPromise = PatientAdmission.aggregate([
    // Match documents within the last 3 months
    {
      $match: {
        hospitalId: new mongoose.Types.ObjectId(hospitalId),
        createdAt: { $gte: threeMonthsAgo },
      },
    },
    // Group by year, month, and day then count admitted and discharged patients
    {
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        admittedCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'Admitted'] }, 1, 0],
          },
        },
        dischargedCount: {
          $sum: {
            $cond: [{ $eq: ['$status', 'Discharged'] }, 1, 0],
          },
        },
      },
    },
    // Sort by date in ascending order
    {
      $sort: {
        '_id.date': 1,
      },
    },
    // Project data into a more readable format
    {
      $project: {
        _id: 0,
        date: '$_id.date',
        admitted: '$admittedCount',
        discharged: '$dischargedCount',
      },
    },
  ]);

  const [bedStats,totalAllocatedBeds,allocatedBedsICU,allocatedBedsGeneral,allocatedBedsEmergency,lastThreeMonthsPatients] = await Promise.all([bedStatsPromise,totalAllocatedBedsPromise,allocatedBedsICUPromise,allocatedBedsGeneralPromise,allocatedBedsEmergencyPromise,getLastThreeMonthsPatientsPromise]);

  const countBeds = {
    totalAllocatedBeds,
    allocatedBedsICU,
    allocatedBedsEmergency,
    allocatedBedsGeneral,
  }
  const data = {
    bedStats,
    countBeds,
    lastThreeMonthsPatients,
  }
  // Respond with the data in the format expected by the frontend
  res.status(200).json({
    success: true,
    data
  });
});

export const getInventoryData = async (req, res) => {
  const hospitalId = req.query.id; // Assuming hospital ID is attached to the req.user
  const { category } = req.query; // Get the category from query params

  try {
    // Execute all three aggregation queries concurrently using Promise.all
    const [stockData, totalProductsData, categoryDistribution] = await Promise.all([
      // Aggregation for stock data by category
      Inventory.aggregate([
        {
          $match: {
            hospitalId: new mongoose.Types.ObjectId(hospitalId),
            category: category
          }
        },
        {
          $group: {
            _id: {
              $cond: [
                { $eq: ["$quantity", 0] }, // If quantity is 0, it's Out of Stock
                "Out of Stock",
                {
                  $cond: [
                    { $lte: ["$quantity", 20] }, // If quantity <= 20, it's Low Stock
                    "Low Stock",
                    "In Stock" // Otherwise, it's In Stock
                  ]
                }
              ]
            },
            totalItems: { $sum: 1 }, // Count the number of items in each category
            totalQuantity: { $sum: "$quantity" }, // Sum the quantities in each category
          }
        },
        {
          $project: {
            _id: 0,
            status: "$_id", // The status category (In Stock, Low Stock, Out of Stock)
            current: "$totalQuantity", // Total quantity in that status
            total: "$totalItems" // Number of items in that status
          }
        }
      ]),

      // Aggregation for total products over time
      Inventory.aggregate([
        {
          $match: {
            hospitalId: new mongoose.Types.ObjectId(hospitalId),
            category: category
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, // Group by day
            totalProducts: { $sum: "$quantity" } // Sum the quantities for each day
          }
        },
        {
          $sort: { _id: 1 } // Sort by date ascending
        },
        {
          $project: {
            _id: 0, // Exclude the _id field
            date: "$_id", // Rename _id to date
            products: "$totalProducts" // Rename totalProducts to products
          }
        }
      ]),

      // Aggregation for category distribution (excluding "Other" and without fill)
      Inventory.aggregate([
        {
          $match: {
            hospitalId: new mongoose.Types.ObjectId(hospitalId),
            category: { $in: ["Medicines", "Consumables", "Equipment"] } // Only include specific categories
          }
        },
        {
          $group: {
            _id: "$category", // Group by category
            items: { $sum: "$quantity" } // Sum the quantity for each category and label it as 'items'
          }
        },
        {
          $project: {
            _id: 0,
            category: "$_id", // Keep the category as it is
            items: 1 // Keep the items field without renaming or adding a fill color
          }
        }
      ])
    ]);

    // Return an object containing all three data sets
    res.json({
      stockData,
      totalProductsData,
      categoryDistribution
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory data' });
  }
};