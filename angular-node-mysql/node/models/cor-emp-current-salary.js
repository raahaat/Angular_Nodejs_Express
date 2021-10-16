const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_emp_current_salary', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        salary_head     : { type: Sequelize.STRING },
        amount          : { type: Sequelize.INTEGER },
        dependsOnAttendance : { type: Sequelize.STRING },
        process_flag    : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);