const Order = require("../models/order");
const orderDetails = require("../models/orderDetails");

exports.getAllOrderStatus = async (req, res) => {
  try {
    let data = await orderDetails.findAll({
      include: [
        {
          model: Order,
          attributes: ["orderStatus", "UserId", "ProductId"],
        },
      ],
    });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
