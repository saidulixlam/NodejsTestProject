const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Meeting = sequelize.define("meeting", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time:{
    type:DataTypes.STRING,
  },
  slotId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Meeting;
