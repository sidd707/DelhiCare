import express from "express";
import { addInventoryItem, deleteInventoryItem, getHospitalInventory, updateInventoryItem } from "../controllers/inventoryController.js";
import { getInventoryData } from "../controllers/statsController.js";


const app = express.Router();
app.get('/all',getHospitalInventory);
app.post('/new',addInventoryItem);
app.get('/stats',getInventoryData);
app.route('/:id').put(updateInventoryItem).delete(deleteInventoryItem);


export default app;