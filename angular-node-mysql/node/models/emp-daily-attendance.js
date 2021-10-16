const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'emp_daily_attendance', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        attendance_type: { type: Sequelize.STRING },
        attendance_date: { type: Sequelize.DATEONLY },
        attendance_hours: { type: Sequelize.INTEGER }, 
        attendance_code: { type: Sequelize.STRING }, 
        attendance_category: { type: Sequelize.STRING }, 
        amount: { type: Sequelize.INTEGER }, 
        source: { type: Sequelize.STRING }, 
        process_flag: { type: Sequelize.STRING }, 
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);