require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  // Check if MONGODB_URI is set in environment variables
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not defined in .env file");
    process.exit(1); // Exit process with failure
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
