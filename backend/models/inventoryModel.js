import mongoose from "mongoose"

const inventorySchema = new mongoose.Schema({
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hospital',
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Medicines', 'Consumables', 'Equipment',]
    },
    itemName: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    expirationDate: {
      type: Date
    },
},{
    timestamps : true,
});

export const Inventory = mongoose.model("inventory",inventorySchema);