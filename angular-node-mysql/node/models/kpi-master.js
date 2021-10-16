const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_master', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        branch              : { type: Sequelize.STRING },
        department          : { type: Sequelize.STRING },
        designation         : { type: Sequelize.STRING },
        category            : { type: Sequelize.STRING },
        division            : { type: Sequelize.STRING },
        period_from         : { type: Sequelize.DATEONLY },
        period_to           : { type: Sequelize.DATEONLY },
        employee_date       : { type: Sequelize.DATEONLY },
        approval_date       : { type: Sequelize.DATEONLY },
        recommend           : { type: Sequelize.STRING },
        remark1             : { type: Sequelize.STRING },
        remark2             : { type: Sequelize.STRING },
        rater1              : { type: Sequelize.STRING },
        rater2              : { type: Sequelize.STRING },
        employee_acceptance : { type: Sequelize.STRING },
        kpi_status          : { type: Sequelize.STRING },
        kpi_year            : { type: Sequelize.STRING },
        kpi_group           : { type: Sequelize.STRING },
        functional_title    : { type: Sequelize.STRING },
        job_portfolio       : { type: Sequelize.STRING },
        final_flag          : { type: Sequelize.STRING },
        company_mark        : { type: Sequelize.STRING },
        comity              : { type: Sequelize.STRING },
        company_remark      : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);