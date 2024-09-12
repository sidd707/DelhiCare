import mongoose from "mongoose";

const waitingQueueSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    },
    department: {
        type: String,
        enum: ['ICU', 'General', 'Emergency'],
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Waiting', 'Admitted'],
        default: 'Waiting'
    },
}, {
    timestamps: true,
});

export const WaitingQueue = mongoose.model("WaitingQueue", waitingQueueSchema);
