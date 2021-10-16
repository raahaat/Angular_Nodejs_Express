const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'address_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pycomcde: { type: Sequelize.STRING },
        pyhdrcde: { type: Sequelize.STRING },
        pysofcde: { type: Sequelize.STRING },
        pycoddes: { type: Sequelize.STRING },
        pyostamp: { type: Sequelize.STRING },
        pytstamp: { type: Sequelize.DATE }   
    },     
    { timestamps: false, freezeTableName: true }
);