const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../DBConnection/db_connection");

// Define the Product model
const Product = sequelize.define("Product", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Product;
