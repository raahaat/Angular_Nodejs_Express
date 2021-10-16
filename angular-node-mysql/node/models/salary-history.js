const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'salary_history', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        transaction_date: { type: Sequelize.DATE },
        branch : { type: Sequelize.STRING },
        salary_head : { type: Sequelize.STRING },
        working_hours : { type: Sequelize.INTEGER },
        percentile : { type: Sequelize.INTEGER },
        branch_dep : { type: Sequelize.STRING },
        category : { type: Sequelize.STRING },
        attendance_flag : { type: Sequelize.STRING },
        amount : { type: Sequelize.INTEGER },
        pay_mode : { type: Sequelize.STRING },
        process_flag : { type: Sequelize.STRING },
        source : { type: Sequelize.STRING },
        auth_by : { type: Sequelize.STRING },
        auth_date : { type: Sequelize.DATE },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);