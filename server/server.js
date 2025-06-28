require("dotenv").config();
const express = require("express");
const connectDB = require("./database/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminCategoryRouter = require("./routes/admin/category-routes");
const adminBrandRouter = require("./routes/admin/brand-routes");
const shopProductsRouter = require("./routes/shop/products-routes");

// Initialize express server
const app = express();

// Set port to be used by backend
const port = 4000;

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

//Admin routes
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/categories", adminCategoryRouter);
app.use("/api/admin/brands", adminBrandRouter);

app.use("/api/shop/products", shopProductsRouter);

app.listen(port, () => console.log(`Server startes on PORT:${port}`));
