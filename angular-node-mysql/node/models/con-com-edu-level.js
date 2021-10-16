const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_com_edu_level', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        hard_code: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        soft_code: { type: Sequelize.STRING },
        description: { type: Sequelize.STRING },
        hierarchy: { type: Sequelize.INTEGER },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);