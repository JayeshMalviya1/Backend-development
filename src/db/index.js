import mongoose from "mongoose";
import { DB_Name } from "../constants.js";
const uri = process.env.MONGODB_URI; 


const connectDB = async () => {
  try {
    console.log("DEBUG => process.env.MONGODB_URI:", process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("MONGO connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;