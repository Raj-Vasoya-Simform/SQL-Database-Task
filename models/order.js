const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../DBConnection/db_connection");

// var randomDays = Math.floor(Math.random() * 7) + 1;
// deliveryDate.setDate(deliveryDate.getDate() + randomDays); // adds the random number of days to the delivery date

 // updates the deliveryDate every 3 seconds

// Define the Order model
const Order = sequelize.define("Order", {
  orderStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expectedDeliveryDate: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const expdate = this.getDataValue("expectedDeliveryDate");
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const date = expdate.toLocaleDateString("en-US", options);
      return { date };
    },
  },
});

module.exports = Order;
