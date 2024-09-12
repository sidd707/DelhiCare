import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    hospitalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'hospital',
      required: true
    },
    department: {
      type: String,
      enum: ['Emergency', 'General', 'ICU'],
      required: true
    },
    isOccupied: {
      type: Boolean,
      default : false,
    },
},{
    timestamps : true,
});
  
export const Bed = mongoose.model("bed",bedSchema);