const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'leave_approval_person', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        approval_level      : { type: Sequelize.INTEGER },
        employee_code       : { type: Sequelize.STRING },
        session_id          : { type: Sequelize.STRING },
        applicant_id        : { type: Sequelize.STRING }
    },     
    { timestamps: false, freezeTableName: true }
);