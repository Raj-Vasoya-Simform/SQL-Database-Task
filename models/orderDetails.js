const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../DBConnection/db_connection");

// Define the OrderDetail model
const OrderDetail = sequelize.define("OrderDetail", {});

module.exports = OrderDetail;
