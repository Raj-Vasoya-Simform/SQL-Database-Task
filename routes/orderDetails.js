const express = require("express");
const orderDetailsController = require("../controller/orderDetails");
const orderDetails = express.Router();

orderDetails.get("/AllOrderStatus", orderDetailsController.getAllOrderStatus);

module.exports = orderDetails;
