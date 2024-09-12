import express from "express";
import {createBeds} from "../controllers/bedController.js";


const app = express.Router();

app.post("/create",createBeds);
export default app;