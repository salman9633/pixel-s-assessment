import mongoose from "mongoose";
import { mongoURI } from "./envConfig.js";


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI,{});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB