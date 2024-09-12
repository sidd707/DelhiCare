import mongoose from "mongoose";


const patientAdmissionSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hospital',  // Reference to the Hospital collection
    required: true
  },
  patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'patient',  // Reference to the Patient collection
      required: true
  },
  bedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bed',  // Reference to the Bed collection
      required: true
  },
  department: {
      type: String,
      enum: ['ICU', 'General', 'Emergency'],  // Department options
      required: true
  },
  status: {
      type: String,
      enum: ['Admitted', 'Discharged'],  // Status options
      required: true
  },
  score:{
    type : Number,
    min : 1,
    max : 5,
  }
  },{
    timestamps:true,
});
  
export const PatientAdmission = mongoose.model("patientAdmisson",patientAdmissionSchema);