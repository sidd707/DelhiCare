import express from "express";
import { loginHospital, registerHospital } from "../controllers/hospitalController.js";


const app = express.Router();

app.post("/register",registerHospital);
app.post("/login",loginHospital);









export default app;