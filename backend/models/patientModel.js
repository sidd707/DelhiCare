import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    department :{
        type : String,
        enum : ['ICU', 'General', 'Emergency'],
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    address: {
        street: { type: String, required: true },
        locality: { type: String, required: true },
        city: { 
            type: String, 
            required: true 
        },
        pinCode: { type: String, required: true }
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    emergencyContact :{
        name : {
            type : String,
            required: true
        },
        contactNumber :{
            type : String,
            required : true,
        },
    },
    reasonForAdmission : {
        type : String,
    },
    existingMedicalCondition : {
        type : String,
    }
}, { 
    timestamps: true 
});

export const Patient = mongoose.model('patient', patientSchema);