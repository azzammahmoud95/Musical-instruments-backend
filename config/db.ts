import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongooseConnect } from "../types";

dotenv.config();
mongoose.set("strictQuery", true);

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.MONGO_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME as string,
      } as MongooseConnect
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Database connection failed. Exiting now...");
    console.error(error);
    process.exit(1);
  }
};

// Connection error handling
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});
mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

export default connectDB;
