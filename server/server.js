require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");

// Initialize express server
const app = express();

// Set port to be used by backend
const port = process.env.PORT || 5000;

connectDB();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true, // Allow cookies to be sent
  })
);

//API Endpoints
app.get("/", (req, res) => res.send("API Working"));
app.use("/api/auth", authRouter);

app.listen(port, () => console.log(`Server startes on PORT:${port}`));
