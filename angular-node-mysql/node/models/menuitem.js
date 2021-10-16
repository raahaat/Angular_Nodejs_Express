const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
  'menuitems',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true  
    },
    compcode: {
        type: Sequelize.STRING
    },
    menupath: {
        type: Sequelize.STRING
    },
    menuname: {
        type: Sequelize.STRING
    },
    menuicon: {
        type: Sequelize.STRING
    },
    menuserl:{
        type: Sequelize.INTEGER,
    },
    menutype: {
        type: Sequelize.STRING
    },
    reqtauth: {
        type: Sequelize.STRING
    },
    createby: {
        type: Sequelize.STRING
    },
    createdt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
);

// module.exports.associate = function(models) {
//     console.log('test 123');
//     module.exports.belongsTo(models.menu)
//   };
  