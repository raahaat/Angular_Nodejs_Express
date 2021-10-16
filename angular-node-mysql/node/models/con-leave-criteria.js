const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_leave_criteria', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       
        company_code        : { type: Sequelize.STRING },
        leave_type_code     : { type: Sequelize.STRING },
        auto_deduct         : { type: Sequelize.STRING },
        leave_deduct_from   : { type: Sequelize.STRING },
        maximum_day         : { type: Sequelize.INTEGER },
        leave_taken_time    : { type: Sequelize.INTEGER },
        yearly              : { type: Sequelize.STRING },
        employee_type       : { type: Sequelize.STRING },
        criteria_start_from : { type: Sequelize.STRING },
        criteria_in_year    : { type: Sequelize.INTEGER },
        negetive_allow      : { type: Sequelize.STRING },
        allow_days          : { type: Sequelize.INTEGER },
        apply_in_holiday    : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);
