import mongoose from "mongoose"

import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  alternativeNames: {
    type: [String], // Array of strings
    default: [],
  },
  images: {
    type: [String], // Array of strings
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  lastPrice: {
    type: Number,
    default: 0, // Default value if not provided
  },
  description: {
    type: String,
    required: true,
  },
  stockCount: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
