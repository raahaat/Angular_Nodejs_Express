const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'earning_deduction_code', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        hard_code: { type: Sequelize.STRING },
        soft_code: { type: Sequelize.STRING }, 
        earn_deduct_code: { type: Sequelize.STRING }, 
        serial_no: { type: Sequelize.INTEGER }, 
        description: { type: Sequelize.STRING } ,     
        time_stamp: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);