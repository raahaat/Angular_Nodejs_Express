const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'employee_overtime_service', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        effective_date: { type: Sequelize.DATEONLY },
        expire_date: { type: Sequelize.DATEONLY },
        transaction_month : { type: Sequelize.STRING },
        transaction_year: { type: Sequelize.STRING },
        process_flag: { type: Sequelize.STRING },
        process_date: { type: Sequelize.DATEONLY },
        show_flag: { type: Sequelize.STRING },
        temporary_stop: { type: Sequelize.STRING },
        sw_serial_date: { type: Sequelize.DATEONLY },
        insert_by: { type: Sequelize.STRING },
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE }  
    },     
    { timestamps: false, 
      freezeTableName: true }
);