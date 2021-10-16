const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'pay_risk_allowance_process', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING(8) },
        employee_code       : { type: Sequelize.STRING(30) },
        branch_code         : { type: Sequelize.STRING(10) },
        designation_code    : { type: Sequelize.STRING(10) },
        amount              : { type: Sequelize.DECIMAL(10,2) },
        month               : { type: Sequelize.STRING(8) },
        year                : { type: Sequelize.STRING(8) },
        insert_by           : { type: Sequelize.STRING(10) },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING(10) },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

