const express = require("express");
const productController = require("../controller/product");
const productRoute = express.Router();

productRoute.get("/products", productController.getProduct);
productRoute.post("/product", productController.addProduct);

module.exports = productRoute;
