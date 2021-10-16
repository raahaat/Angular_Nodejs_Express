const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_mark_details', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        serial   : { type: Sequelize.STRING },
        kpi_code   : { type: Sequelize.STRING },
        group_name : { type: Sequelize.STRING },
        parent_name : { type: Sequelize.STRING },
        total_mark : { type: Sequelize.INTEGER },
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);