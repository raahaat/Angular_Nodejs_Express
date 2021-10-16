const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'sal_cer_gen_temp', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        salary_head: { type: Sequelize.STRING },
        amount: { type: Sequelize.INTEGER },
        sal_session: { type: Sequelize.STRING },
        document_date: { type: Sequelize.DATEONLY },
        sign_01: { type: Sequelize.STRING },
        sign_02: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);