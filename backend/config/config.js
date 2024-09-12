import mongoose from "mongoose";

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URL || "");
    console.log("db connected");
}
