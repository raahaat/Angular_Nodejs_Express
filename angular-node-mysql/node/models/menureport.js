const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
  'menureports',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true  
    },
    compcode: {
        type: Sequelize.STRING
    },
    parentId: {
        type: Sequelize.INTEGER
    },
    reportname: {
        type: Sequelize.STRING
    },
    mainHeaderText: {
        type: Sequelize.STRING
    },
    reporticon: {
        type: Sequelize.STRING
    },
    reportserl:{
        type: Sequelize.INTEGER,
    },
    reporttype: {
        type: Sequelize.STRING
    },
    reqtauth: {
        type: Sequelize.STRING
    },
    reportCode: {
        type: Sequelize.STRING
    },
    groupQuery: {
        type: Sequelize.STRING
    },
    groupCodeParam: {
        type: Sequelize.STRING
    },
    groupDisplaySingle: {
        type: Sequelize.STRING
    },
    groupColumnDisplayName: {
        type: Sequelize.STRING
    },
    groupDIsplayHEaderPercentage: {
        type: Sequelize.INTEGER
    },
    headerShow: {
        type: Sequelize.STRING
    },
    footerShow: {
        type: Sequelize.STRING
    },
    landscapeFlag: {
        type: Sequelize.STRING
    },
    headerBoldFlag: {
        type: Sequelize.STRING
    },
    headerFontSize: {
        type: Sequelize.INTEGER
    },
    headerColor: {
        type: Sequelize.STRING
    },
    headerBackground: {
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
  