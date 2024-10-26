import mongoose from "mongoose";
import { mongoURI } from "./envConfig";



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process if connection fails
    }
};

export default connectDB