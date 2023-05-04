const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

require("./DBConnection/db_connection");

const User = require("./models/user");
const Order = require("./models/order");
const Product = require("./models/product");
const OrderDetail = require("./models/orderDetails");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const orderRoute = require("./routes/order");
const orderDetails = require("./routes/orderDetails");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(userRoutes, productRoutes, orderRoute, orderDetails);

// Define the associations between the models
Order.belongsTo(User, { constraints: true });
Order.belongsTo(Product, { constraints: true });
OrderDetail.belongsTo(Order, { constraints: true });

app.listen(3000, () => {
  console.log("Server Running");
});
