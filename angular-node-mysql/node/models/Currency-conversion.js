const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_pay_conver_rate', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        base_currency: { type: Sequelize.STRING },
        conversion_currency: { type: Sequelize.STRING }, 
        conversion_date: { type: Sequelize.DATEONLY} , 
        conversion_rate: { type: Sequelize.INTEGER },      
        round_scale: { type: Sequelize.INTEGER },      
        insert_by: { type: Sequelize.STRING },      
        insert_date: { type: Sequelize.DATE },      
        update_by: { type: Sequelize.STRING },      
        update_date: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);