import { Hospital } from "../models/hospitalModel.js";
import { User } from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import { tryCatch } from "./error.js";


export const authenticateUser = tryCatch(async (req, res, next) => {
    let token;
    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;
    if (!token) {
        return next(new ErrorHandler("Not authorized, no token provided", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }
        // Attach the user to the request
        req.user = user;
        console.log("hello");
        next();
    } catch (error) {
        return next(new ErrorHandler("Authorization failed", 401));
    }
});

export const authenticateHospital = tryCatch(async (req, res, next) => {
    let token;
    // Read JWT from the 'jwt' cookie
    token = req.cookies.jwt;
    if (!token) {
        return next(new ErrorHandler("Not authorized, no token provided", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hospital = await Hospital.findById(decoded.userId).select("-password");
        if (!hospital) {
            return next(new ErrorHandler('Hospital not found', 404));
        }
        // Attach the hospital to the request
        req.user = hospital;
        next();
    } catch (error) {
        return next(new ErrorHandler("Authorization failed", 401));
    }
});