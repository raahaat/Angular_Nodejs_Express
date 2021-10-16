const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'selfservice_menu',
    {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      level: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      parentId: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      menupath: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      menuleaf: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      menuserl: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      }
    }, 
    {
      timestamps: false
    }
);