require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//create a connection to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "cache-control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Allow cookies to be sent
  })
);

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
