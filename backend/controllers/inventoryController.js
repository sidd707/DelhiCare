// Get all inventory items for the logged-in hospital

import { tryCatch } from "../middlewares/error.js";
import { Inventory } from "../models/inventoryModel.js";
import ErrorHandler from "../utils/utilityClass.js";


// Get all inventory items for the logged-in hospital
export const getHospitalInventory = tryCatch(async (req, res, next) => {
    const hospitalId = req.user._id || req.query.id; // The logged-in hospital's ID is in req.user
    
    // Fetch inventory items for the hospital
    const inventory = await Inventory.find({ hospitalId });

    res.status(200).json({
        success: true,
        data: inventory
    });
});

export const getCityInventory = tryCatch(async (req, res, next) => {
    const inventory = await Inventory.find();
    res.status(200).json({
        success: true,
        data: inventory
    });
});

// Add a new inventory item for the logged-in hospital
export const addInventoryItem = tryCatch(async (req, res, next) => {
    const hospitalId = req.query.id || req.user._id; // The logged-in hospital's ID is in req.user
    const { category, itemName, quantity, unit, expirationDate } = req.body;
    // Validate the request body
    if (!category || !itemName || !quantity || !unit) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    // Create a new inventory item
    await Inventory.create({
        hospitalId,
        category,
        itemName,
        quantity,
        unit,
        expirationDate
    });

    res.status(201).json({
        success: true,
        message: 'Inventory item added successfully',
    });
});

// Update an existing inventory item for the logged-in hospital
export const updateInventoryItem = tryCatch(async (req, res, next) => {
    const hospitalId = req.query.id || req.user._id; // The logged-in hospital's ID is in req.user
    const { id } = req.params; // Inventory item ID
    // Find the inventory item belonging to this hospital
    const inventoryItem = await Inventory.findOne({ _id: id, hospitalId });
    if (!inventoryItem) {
        return next(new ErrorHandler("Inventory item not found or you do not have access", 404));
    }

    // Update the inventory item
    inventoryItem.category = req.body.category || inventoryItem.category;
    inventoryItem.itemName = req.body.itemName || inventoryItem.itemName;
    inventoryItem.quantity = req.body.quantity || inventoryItem.quantity;
    inventoryItem.unit = req.body.unit || inventoryItem.unit;
    inventoryItem.expirationDate = req.body.expirationDate || inventoryItem.expirationDate;

    await inventoryItem.save();

    res.status(200).json({
        success: true,
        message: 'Inventory item updated successfully'
    });
});

// Delete an inventory item for the logged-in hospital
export const deleteInventoryItem = tryCatch(async (req, res, next) => {
    const hospitalId = req.query.id || req.user._id; // The logged-in hospital's ID is in req.user
    const { id } = req.params; // Inventory item ID
    // Find the inventory item belonging to this hospital
    const inventoryItem = await Inventory.findOne({ _id: id, hospitalId });
    if (!inventoryItem) {
        return next(new ErrorHandler("Inventory item not found or you do not have access", 404));
    }
    await inventoryItem.deleteOne();
    res.status(200).json({
        success: true,
        message: 'Inventory item deleted successfully'
    });
});
export const getInventoryItem = tryCatch(async (req, res, next) => {
    const hospitalId = req.query.id || req.user._id; // The hospital's ID passed in the query string
    const { id } = req.params; // Inventory item ID from the URL parameters

    // Find the inventory item belonging to this hospital
    const inventoryItem = await Inventory.findOne({ _id: id, hospitalId });
    
    if (!inventoryItem) {
        return next(new ErrorHandler("Inventory item not found or you do not have access", 404));
    }

    res.status(200).json({
        success: true,
        data: inventoryItem
    });
});