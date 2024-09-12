import { tryCatch } from "../middlewares/error.js";
import cron from "node-cron";
import { Bed } from "../models/bedModel.js";
import { Notification } from "../models/notificationModel.js";
import { PatientAdmission } from "../models/patientAdmissionModel.js";
import { Patient } from "../models/patientModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import { io } from '../app.js';

import mongoose from "mongoose";

import { Hospital } from "../models/hospitalModel.js";
import { WaitingQueue } from "../models/WaitingQueueModel.js";


// Request bed allotment
export const requestBedAllotment = tryCatch(async (req, res, next) => {
    const { patientId, hospitalId } = req.body;

    if (!patientId || !hospitalId) {
        return next(new ErrorHandler("Please provide patient ID and hospital ID", 400));
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
        return next(new ErrorHandler("Patient not found", 404));
    }

    const message = `A bed allotment request has been made for patient ${patient.name} in the ${patient.department} department.`;

    const notification = await Notification.create({
        hospitalId,
        patientId,
        message
    });

    // Send notification to hospital admin
    io.to(`hospital_${hospitalId}`).emit('bedAllotmentRequest', notification);

    res.status(200).json({
        success: true,
        message: "Bed allotment request sent successfully",
        data: notification
    });
});


const allocateBedsFromQueue = async () => {
    try {
        // Find available beds
        const availableBeds = await Bed.find({ isOccupied: false });

        if (availableBeds.length === 0) {
            console.log('No available beds currently.');
            return;
        }

        // Get all patients in the waiting queue, sorted by priority score
        const waitingPatients = await WaitingQueue.find({ status: 'Waiting' })
            .populate('patientId')
            .sort({ score: -1 });

        for (const patientRecord of waitingPatients) {
            const patient = patientRecord.patientId;

            // Find the best bed for the patient based on department and availability
            const suitableBeds = availableBeds.filter(bed => bed.department === patient.department);

            if (suitableBeds.length > 0) {
                // Allocate the first suitable bed
                const bestBed = suitableBeds[0];
                bestBed.isOccupied = true;
                await bestBed.save();

                // Create a patient admission record
                await PatientAdmission.create({
                    hospitalId: new mongoose.Types.ObjectId(bestBed.hospitalId),
                    patientId: new mongoose.Types.ObjectId(patient._id),
                    bedId: new mongoose.Types.ObjectId(bestBed._id),
                    department: patient.department,
                    status: 'Admitted',
                    score: patientRecord.score
                });

                // Remove the patient from the waiting queue
                await WaitingQueue.findByIdAndDelete(patientRecord._id);

                // Notify the patient (you could send an SMS or other notification here)
                console.log(`Allocated bed ${bestBed._id} to patient ${patient.name}.`);
            }
        }
    } catch (error) {
        console.error('Error in allocating beds from queue:', error);
    }
};

// Schedule the task to run every 30 minutes
cron.schedule('*/30 * * * *', allocateBedsFromQueue);

export const createPatient = tryCatch(async (req, res, next) => {
    const {
        name,
        age,
        gender,
        contactNumber,
        email,
        address: { street, locality, city, pinCode } = {},
        department,
        reasonForAdmission,
        latitude,
        longitude,
        emergencyContact: { name: emergencyName, contactNumber: emergencyContactNumber } = {},
    } = req.body;

    // Validate the incoming data
    if (
        !name || !age || !gender || !contactNumber || !email ||
        !street || !locality || !city || !pinCode ||
        !department || !latitude || !longitude ||
        !emergencyName || !emergencyContactNumber
    ) {
        return next(new ErrorHandler('Please provide all required fields', 400));
    }

    // Attempt to parse latitude and longitude to ensure they are numbers
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
        return next(new ErrorHandler('Invalid latitude or longitude', 400));
    }

    // Create the patient record in the database
    const newPatient = await Patient.create({
        name,
        age,
        gender,
        contactNumber,
        email,
        address: { street, locality, city, pinCode },
        department,
        reasonForAdmission,
        location: { type: "Point", coordinates: [parsedLongitude, parsedLatitude] },
        emergencyContact: {
            name: emergencyName,
            contactNumber: emergencyContactNumber
        }
    });

    // Find the closest hospitals based on the patient's location
    const closestHospitals = await Hospital.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [parsedLongitude, parsedLatitude] },
                distanceField: "distance",
                spherical: true,
            }
        },
        {
            $lookup: {
                from: "beds", // The 'beds' collection
                localField: "_id",
                foreignField: "hospitalId",
                as: "beds"
            }
        },
        {
            $addFields: {
                availableBedsCount: {
                    $size: "$beds" // Count the total number of beds, irrespective of department
                }
            }
        },
        {
            $project: {
                name: 1,
                address: 1,
                latitude: 1,
                longitude: 1,
                distance: { $divide: ["$distance", 1000] }, // Convert distance to kilometers
                availableBedsCount: 1
            }
        },
        {
            $sort: { distance: 1 } // Sort by distance in ascending order (nearest first)
        }
    ]);

    // Respond with the newly created patient and the closest hospitals
    res.status(201).json({
        success: true,
        message: "Patient created successfully",
        data: {
            patient: newPatient,
            closestHospitals
        }
    });
});
