const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'exam_result', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pycomcde: { type: Sequelize.STRING },
        pyhdrcde: { type: Sequelize.STRING },
        pysofcde: { type: Sequelize.STRING },
        pycoddes: { type: Sequelize.STRING },
        pyotrfac: { type: Sequelize.STRING }, 
        pyotpfac: { type: Sequelize.STRING },
        pyamount: { type: Sequelize.INTEGER },
        pyostamp: { type: Sequelize.STRING },
        pytstamp: { type: Sequelize.DATE }   
    },     
    { timestamps: false, freezeTableName: true }
);