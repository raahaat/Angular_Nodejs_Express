const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'employee_tax_history', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        tax_month           : { type: Sequelize.STRING },
        tax_year            : { type: Sequelize.STRING },
        tax_dr_amount       : { type: Sequelize.INTEGER },
        tax_ac_amount       : { type: Sequelize.INTEGER },
        tax_pay_amount      : { type: Sequelize.INTEGER },
        tax_balance         : { type: Sequelize.INTEGER },
        tax_status          : { type: Sequelize.STRING },
        tax_pay_date        : { type: Sequelize.DATEONLY },
        minimum_balance_flag: { type: Sequelize.STRING },
        rebate_amount       : { type: Sequelize.INTEGER },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, 
      freezeTableName: true }
);