import { tryCatch } from "../middlewares/error.js";
import {Bed}  from "../models/bedModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import mongoose from "mongoose";


// Create individual beds based on the total number of beds provided by the admin
export const createBeds = tryCatch(async (req, res, next) => {
    const { hospitalId, department, totalBeds } = req.body;

    if (!hospitalId || !department || !totalBeds || totalBeds <= 0) {
        return next(new ErrorHandler("Please provide valid inputs", 400));
    }
    const hospitalObjectId = new mongoose.Types.ObjectId(hospitalId);
    const beds = [];

    // Create individual bed records
    for (let i = 0; i < totalBeds; i++) {
        beds.push({
            hospitalId:hospitalObjectId,
            department,
            isOccupied: false
        });
    }
    // Insert all bed records into the database
    await Bed.insertMany(beds);
    res.status(201).json({
        success: true,
        message: `${totalBeds} beds created successfully in ${department} department`,
    });
});
