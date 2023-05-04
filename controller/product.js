const Product = require("../models/product");

exports.getProduct = async (req, res) => {
  try {
    let data = await Product.findAll();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.addProduct = async (req, res) => {
  try {
    let data = await Product.create(req.body);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
