const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("task", "root", "Pranj@09", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sync successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync : ", error);
  });
  
module.exports = sequelize;