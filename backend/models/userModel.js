import mongoose from "mongoose";
import validate from "validator";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required :[true,"Please enter name"]
    },
    email : {
        type : String,
        required : [true,"Please enter email"],
        unique : true,
        validate : validate.default.isEmail,
    },
    password : {
        type : String,
        required : [true,"Please enter password"],
    },
    contactNumber: {
        type: String,  // Store phone number for contact/verification
        required: true
    },
    role : {
        type : String,
        enum : ["admin","user"],
        default : "user",
    }
},{
    timestamps : true,
})

export const User = mongoose.model("users",userSchema);