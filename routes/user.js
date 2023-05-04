const express = require("express");
const userController = require("../controller/user");

const userRoute = express.Router();

userRoute.get("/users", userController.getUser);

userRoute.post("/user", userController.addUser);

module.exports = userRoute;
