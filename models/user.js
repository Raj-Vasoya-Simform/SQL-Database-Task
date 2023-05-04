const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../DBConnection/db_connection");

// Define the User model
const User = sequelize.define("User", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
});
module.exports = User;


