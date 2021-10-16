const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_head_reporting', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },       
        company_code    : { type: Sequelize.STRING },
        division_code   : { type: Sequelize.STRING },
        effective_date  : { type: Sequelize.DATE },
        expire_date     : { type: Sequelize.DATE },
        employee_code   : { type: Sequelize.STRING },
        report_header   : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);