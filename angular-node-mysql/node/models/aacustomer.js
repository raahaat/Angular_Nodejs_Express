const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'customer', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },   
        cust_id     : { type: Sequelize.INTEGER },
        cust_name   : { type: Sequelize.STRING },
        cust_add    : { type: Sequelize.STRING },
    },     
    { timestamps: false, freezeTableName: true }
);