const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'customer_table', {
        
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        c_name   : { type: Sequelize.STRING },
        c_phone   : { type: Sequelize.STRING },
        c_email   : { type: Sequelize.STRING },
        c_password   : { type: Sequelize.STRING },
        c_address    : { type: Sequelize.STRING },
    },     
    { timestamps: false, freezeTableName: true }
);