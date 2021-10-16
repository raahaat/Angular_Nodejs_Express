const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'menu_page_list', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        parent_code     : { type: Sequelize.STRING },
        page_code       : { type: Sequelize.STRING },
        page_name       : { type: Sequelize.STRING },
        icon_name       : { type: Sequelize.STRING },
        tool_tip        : { type: Sequelize.STRING }, 
        routing_path    : { type: Sequelize.STRING },
        serial_no       : { type: Sequelize.INTEGER },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);