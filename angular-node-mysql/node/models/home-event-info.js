const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'home_event_info', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        event_title   : { type: Sequelize.STRING },
        event_details : { type: Sequelize.STRING },
        event_date : { type: Sequelize.DATE },
        division_code : { type: Sequelize.STRING },
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);