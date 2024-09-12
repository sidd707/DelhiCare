import dotenv from 'dotenv';
dotenv.config();
import twilio from 'twilio';
import { User } from '../models/userModel.js';
import ErrorHandler from '../utils/utilityClass.js';
import { tryCatch } from '../middlewares/error.js';

// Twilio setup
const accountSid =process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);

// Middleware to initiate registration and send OTP
export const initiateRegistration = tryCatch(async (req, res, next) => {
    const { name, email, password, contactNumber } = req.body;

    // Validate input
    if (!name || !email || !password || !contactNumber) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new ErrorHandler("User already exists", 401));
    }

    // Store user data temporarily in session
    
    req.session.userData = { name, email, password, contactNumber };

    // Send OTP using Twilio Verify API
    await client.verify.v2.services(verifyServiceSid)
        .verifications
        .create({ to: `+91${contactNumber}`, channel: 'sms' });

    res.status(200).json({
        success: true,
        message: "OTP sent successfully. Please verify your phone number.",
    });
});


