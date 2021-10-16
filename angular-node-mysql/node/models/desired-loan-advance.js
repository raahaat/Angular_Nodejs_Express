const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_desired_loan_advance', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        effectiveDate: { type: Sequelize.DATEONLY },
        expiryDate: { type: Sequelize.DATEONLY },
        designationCode: { type: Sequelize.STRING },
        salaryHead: { type: Sequelize.STRING },
        desiredPercent: { type: Sequelize.INTEGER },
        desiredFixedAmount: { type: Sequelize.INTEGER },
        extraDesiredPercent: { type: Sequelize.INTEGER },
        status: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);