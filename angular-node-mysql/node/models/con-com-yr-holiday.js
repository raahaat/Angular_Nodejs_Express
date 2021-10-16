const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_com_yr_holiday', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        holiday_date: { type: Sequelize.DATEONLY },
        description: { type: Sequelize.STRING },
        sort_description: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);