import express from "express";
import { getHospitalStats } from "../controllers/statsController.js";




const app = express.Router();

app.get("/bedstats",getHospitalStats);
export default app;