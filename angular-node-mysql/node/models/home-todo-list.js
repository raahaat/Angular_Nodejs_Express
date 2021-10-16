const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'home_todo_list', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        task_header   : { type: Sequelize.STRING },
        task_details : { type: Sequelize.STRING },
        task_add_date : { type: Sequelize.DATE },
        task_target_date: { type: Sequelize.DATE },
        task_priority : { type: Sequelize.INTEGER },
        task_status : { type: Sequelize.STRING },
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);