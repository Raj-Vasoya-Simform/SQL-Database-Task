const User = require("../models/user");
const sequelize = require("../DBConnection/db_connection");

exports.getUser = async (req, res) => {
  try {
    let data = await User.findAll();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

exports.addUser = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      // Check if the user already exists
      const Email = req.body.email;
      const existingUser = await User.findOne({
        where: {
          email: Email,
        },
        transaction: t,
      });

      // If the user already exists, throw an error to prevent the transaction from being committed
      if (existingUser) {
        res.json({ msg: "User already exists." });
      }
    });
    let data = await User.create(req.body);
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
