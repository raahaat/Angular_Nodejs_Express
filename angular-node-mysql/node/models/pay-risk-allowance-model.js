const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'pay_risk_allowance', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING(8) },
        employee_code       : { type: Sequelize.STRING(30) },
        earning_code       : { type: Sequelize.STRING(30) },
        effective_date      : { type: Sequelize.DATEONLY },
        expire_date         : { type: Sequelize.DATEONLY },
        amount              : { type: Sequelize.DECIMAL(10,2) },
        active_flag         : { type: Sequelize.STRING(2) },
        insert_by           : { type: Sequelize.STRING(10) },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING(10) },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

