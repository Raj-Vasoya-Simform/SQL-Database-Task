const express = require("express");
const orderController = require("../controller/order");

const orderRoute = express.Router();

orderRoute.post("/order", orderController.placeOrder);

orderRoute.get("/orders", orderController.getAllOrders);

orderRoute.get("/order/user/:id", orderController.getOrderByUserId);

orderRoute.get("/order/status/:orderStatus", orderController.getOrderByStatus);

orderRoute.get("/order/recentOrders", orderController.getRecentOrder);

orderRoute.get("/order/activeUser", orderController.activeUser);

orderRoute.get("/order/inactiveUser", orderController.InactiveUser);

orderRoute.get("/order/MostExpensiveProduct", orderController.MostExpensiveOrder);

orderRoute.get("/order/MostCheapestProduct", orderController.MostCheapestOrder);

orderRoute.get("/order/MostPurchasedProduct", orderController.MostPurchasedProduct);

module.exports = orderRoute;

