const Sequelize = require('sequelize');
const sequelize = require('./sequelize')


const UserModel = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
});

UserModel.sync(); // create table

module.exports = UserModel;