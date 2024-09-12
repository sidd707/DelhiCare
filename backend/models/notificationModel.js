import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital', // Reference to the Hospital model
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient', // Reference to the Patient model
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    score: {
        type: Number,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

export const Notification = mongoose.model('notification', notificationSchema);