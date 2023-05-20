const Product = require("../models/productModel");
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  var files = [];
  req.files.forEach((file) => {
    files.push(`/images/${file.filename}`);
  });
  const product = new Product({
    product_name: req.body.product_name,
    product_features: req.body.product_features,
    product_description: req.body.product_description,
    product_images: files,
    product_category: req.body.product_category,
    product_subcategory: req.body.product_subcategory,
    product_brand: req.body.product_brand,
    product_publish_date: req.body.product_publish_date,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await Product.findById(req.params.id);
    product.product_name = req?.body?.product_name;
    product.product_features = req?.body?.product_features;
    product.product_description = req?.body?.product_description;
    product.product_images = req?.body?.product_images;
    product.product_category = req?.body?.product_category;
    product.product_subcategory = req?.body?.product_subcategory;
    product.product_brand = req?.body?.product_brand;
    product.product_publish_date = req?.body?.product_publish_date;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

