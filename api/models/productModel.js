const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
  },
  product_features: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  product_images: {
    type: [String],
    required: true,
  },
  product_category: {
    type: String,
    required: true,
  },
  product_subcategory: {
    type: String,
    required: true,
  },
  product_brand: {
    type: String,
    required: true,
  },
  product_publish_date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
