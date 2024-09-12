import express from "express";
import { createPatient } from "../controllers/patientController.js";
import { loginUser, myUser, verifyOTPAndRegister } from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/auth.js";
import { initiateRegistration } from "../middlewares/initiateRegistration.js";



const app = express.Router();

app.post("/register",initiateRegistration);
app.post("/verify-otp",verifyOTPAndRegister);
app.post("/login",loginUser);
app.get('/me',authenticateUser,myUser);
app.post("/create-patient",createPatient);









export default app;