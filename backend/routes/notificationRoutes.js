import express from "express";
import {requestBedAllotment } from "../controllers/patientController.js";
import { getBedRequests, handleBedAllotmentRequest } from "../controllers/hospitalController.js";


const app = express.Router();

app.post('/request-bed-allotment',requestBedAllotment);
app.post('/handle-request',handleBedAllotmentRequest);
app.get('/getbedrequest',getBedRequests);


export default app;

