const Order = require("../models/order");
const orderDetails = require("../models/orderDetails");
const Product = require("../models/product");
const User = require("../models/user");
const { Sequelize, QueryTypes, Model, DATE } = require("sequelize");
const sequelize = require("../DBConnection/db_connection");

const randomDateGenerator = () => {
  const deliveryDate = new Date();
  randomDays = Math.floor(Math.random() * 7) + 1;
  deliveryDate.setDate(deliveryDate.getDate() + randomDays); // adds the new random number of days to the delivery date
  return deliveryDate;
};

exports.placeOrder = async (req, res) => {
  try {
    const { orderStatus, UserId, ProductId } = req.body;
    const expectedDeliveryDate = randomDateGenerator();
    let result = await Order.create({
      UserId,
      ProductId,
      orderStatus,
      expectedDeliveryDate,
    });
    const data = await orderDetails.create({ OrderId: result.id });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    let data = await Order.findAll({
      attributes: [
        "userId",
        "productId",
        "expectedDeliveryDate",
        "orderStatus",
        "createdAt",
      ],
      include: [
        {
          model: User,
          attributes: ["username", "email", "address", "phoneNumber"],
        },
        {
          model: Product,
          attributes: ["productName", "price"],
        },
      ],
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    let data = await Order.findAll({
      attributes: {
        exclude: ["updatedAt", "userId", "productId", "id"],
      },
      where: {
        userId: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["username", "email", "address", "phoneNumber"],
        },
        {
          model: Product,
          attributes: ["productName", "price"],
        },
      ],
    });
    res.status(200).json({ UserDetails: data });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrderByStatus = async (req, res) => {
  try {
    let data = await Order.findAll({
      where: {
        orderStatus: req.params.orderStatus,
      },
      include: [
        {
          model: User,
          attributes: ["username", "email", "address", "phoneNumber"],
        },
        {
          model: Product,
          attributes: ["productName", "price"],
        },
      ],
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.getRecentOrder = async (req, res) => {
  try {
    let data = await Order.findAll({
      attributes: [
        "userId",
        "productId",
        "expectedDeliveryDate",
        "orderStatus",
        "createdAt",
      ],
      order: Sequelize.literal("createdAt DESC"),
      limit: 5,
      include: [
        {
          model: User,
          attributes: ["username", "email", "address", "phoneNumber"],
        },
        {
          model: Product,
          attributes: ["productName", "price"],
        },
      ],
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.activeUser = async (req, res) => {
  try {
    let data = await sequelize.query(
      "SELECT count(`userId`) AS `orders` , `user`.`username` , `user`.`email` ,  `user`.`address`, `user`.`phoneNumber` FROM `Orders` LEFT OUTER JOIN `Users` AS `user` ON `Orders`.`userId` = `user`.`id` GROUP BY `userId` order by Orders desc limit 5",
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.InactiveUser = async (req, res) => {
  try {
    let data = await sequelize.query(
      "select Users.id,Users.username,Users.email,Users.address,Users.phoneNumber from Users where Users.id IN(select Users.id from Users where Users.id NOT IN(select Orders.userId from Orders))",
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.MostExpensiveOrder = async (req, res) => {
  try {
    let data = await sequelize.query(
      "SELECT Orders.id, Orders.UserId, Orders.ProductId, Orders.expectedDeliveryDate, Orders.orderStatus, Orders.createdAt, Users.id, Users.username, Users.email, Users.phoneNumber, Products.id, Products.productName, Products.price AS max_price FROM Orders JOIN Users ON Orders.UserId = Users.id JOIN Products ON Orders.ProductId = Products.id WHERE Products.price = (SELECT MAX(Products.price) FROM Products)",
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.MostCheapestOrder = async (req, res) => {
  try {
    let data = await sequelize.query(
      "SELECT Orders.id, Orders.UserId, Orders.ProductId, Orders.expectedDeliveryDate, Orders.orderStatus, Orders.createdAt, Users.id, Users.username, Users.email, Users.phoneNumber, Products.id, Products.productName, Products.price AS max_price FROM Orders JOIN Users ON Orders.UserId = Users.id JOIN Products ON Orders.ProductId = Products.id WHERE Products.price = (SELECT MIN(Products.price) FROM Products)",
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.MostPurchasedProduct = async (req, res) => {
  try {
    let data = await sequelize.query(
      "SELECT COUNT(ProductId) AS Total_orders,Products.productName,Products.price FROM Orders INNER JOIN Products ON Orders.ProductId = Products.id GROUP BY ProductId ORDER BY count(ProductId) DESC LIMIT 5",
      { type: QueryTypes.SELECT }
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
