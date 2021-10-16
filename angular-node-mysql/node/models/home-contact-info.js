const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'home_contact_info', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        contact_name   : { type: Sequelize.STRING },
        contact_no : { type: Sequelize.STRING },
        short_name : { type: Sequelize.STRING },
        contact_tracer : { type: Sequelize.STRING },
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);