import express from "express";
import { createPatient, requestBedAllotment } from "../controllers/patientController.js";

const app = express.Router();


app.post('/new',createPatient);
app.post('/request-bed',requestBedAllotment);

export default app;