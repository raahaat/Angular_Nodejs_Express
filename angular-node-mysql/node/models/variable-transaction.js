const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'variable_transaction', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        process_month       : { type: Sequelize.STRING },
        process_year        : { type: Sequelize.STRING },
        branch              : { type: Sequelize.STRING },
        transaction_code    : { type: Sequelize.STRING },
        salary_head         : { type: Sequelize.STRING },
        days                : { type: Sequelize.INTEGER },
        amount              : { type: Sequelize.INTEGER },
        percent             : { type: Sequelize.INTEGER },
        naration            : { type: Sequelize.STRING },
        reference           : { type: Sequelize.STRING },
        process_flag        : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);