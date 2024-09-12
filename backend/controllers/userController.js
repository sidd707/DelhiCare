import dotenv from 'dotenv';
dotenv.config();
import { tryCatch } from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/utilityClass.js";
import bcrypt from "bcryptjs";
import createToken from "./../utils/createToken.js";
import twilio from 'twilio';


const verifyServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID ;
const client = twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN);

// Middleware to verify OTP and complete registration
export const verifyOTPAndRegister = tryCatch(async (req, res, next) => {
        const { name, email, password, contactNumber } = req.body;

        // Validate the incoming data
        if (!name || !email || !password || !contactNumber) {
            return next(new ErrorHandler("Please provide all required fields", 400));
        }

        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(new ErrorHandler("User already exists with this email", 400));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            contactNumber,
        });

        // Generate and set a token
        createToken(res, user._id);

        return res.status(200).json({
            success: true,
            message: `Welcome ${user.name}`,
        });
})

// Login User
export const loginUser = tryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    createToken(res, user._id);

    return res.status(201).json({
        success: true,
        message: `Welcome, ${user.name}`,
    });
});

// Logout User
export const logoutUser = tryCatch(async (req, res, next) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    return res.status(201).json({
        success: true,
        message: "Logged out successfully"
    });
});
export const myUser = tryCatch(async(req,res,next)=>{
    const id = req.user?._id;
    if (!id){
        return next(new ErrorHandler("Invalid Id",400));
    }
    const user = await User.findById(id).select('-password');
    if (!user){
        return next(new ErrorHandler("Invalid Id",400));
    }
    return res.status(201).json({
        success : true,
        user,
    });
});