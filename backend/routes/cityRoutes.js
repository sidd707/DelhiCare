import express from "express";
import {getCityStats} from "../controllers/cityStatsController.js";




const app = express.Router();

app.get("/stats",getCityStats);
export default app;