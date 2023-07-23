"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set("strictQuery", true);
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.DB_NAME,
        });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log("Database connection failed. Exiting now...");
        console.error(error);
        process.exit(1);
    }
};
// Connection error handling
mongoose_1.default.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
});
mongoose_1.default.connection.on("connected", () => {
    console.log("MongoDB connected!");
});
exports.default = connectDB;
