import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        street: { type: String, required: true },
        locality: { type: String, required: true },
        city: { 
            type: String, 
            enum: ['Delhi'], 
            required: true, 
            default: 'Delhi' 
        },
        pinCode: { type: String, required: true }
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    totalBeds: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'Point' is required for GeoJSON
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // Array of numbers: [longitude, latitude]
            required: true,
            validate: {
                validator: function(coordinates) {
                    return coordinates.length === 2;
                },
                message: 'Coordinates must contain exactly two elements: [longitude, latitude].'
            }
        }
    }
}, 
{
    timestamps: true,
});

// Create a 2dsphere index on the 'location' field
hospitalSchema.index({ location: '2dsphere' });

// Export the Hospital model
export const Hospital = mongoose.model("hospital", hospitalSchema);