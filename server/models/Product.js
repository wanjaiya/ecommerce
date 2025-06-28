const mongoose = require("mongoose");
const Category = require("./Category");
const Brand = require("./Brand");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: mongoose.Types.ObjectId,
      ref: Category,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: Brand,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: Number,
    totalStock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
