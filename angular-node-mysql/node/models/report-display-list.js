const Sequelize = require('sequelize');
const database = require('../database/db');

module.exports = database.define(
    'report_display_list', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        report_id   : { type: Sequelize.STRING },
        serial_no   : { type: Sequelize.INTEGER },
        display_name: { type: Sequelize.STRING },
        query_display_name : { type: Sequelize.STRING },
        display_length : { type: Sequelize.INTEGER },
        show_on_report : { type: Sequelize.STRING },
        group_flag  : { type: Sequelize.STRING },
        insert_by   : { type: Sequelize.STRING },    
        insert_date : { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);