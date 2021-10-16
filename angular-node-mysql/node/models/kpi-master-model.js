const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_master', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING(8) },
        employee_code       : { type: Sequelize.STRING(30) },
        branch              : { type: Sequelize.STRING(30) },
        department          : { type: Sequelize.STRING(30) },
        designation         : { type: Sequelize.STRING(30) },
        category            : { type: Sequelize.STRING(30) },
        division            : { type: Sequelize.STRING(30) },
        from                : { type: Sequelize.DATEONLY },
        to                  : { type: Sequelize.DATEONLY },
        agree_date          : { type: Sequelize.DATEONLY },
        approve_date        : { type: Sequelize.DATEONLY },
        trno                : { type: Sequelize.STRING(30) },
        remark              : { type: Sequelize.STRING(255) },
        remark2             : { type: Sequelize.STRING(255) },
        rater1              : { type: Sequelize.STRING(10) },
        rater2              : { type: Sequelize.STRING(10) },
        emp_acceptance      : { type: Sequelize.STRING(30) },
        status              : { type: Sequelize.STRING(10) },
        year                : { type: Sequelize.STRING(10) },
        kpi_group           : { type: Sequelize.STRING(30) },
        fun_title           : { type: Sequelize.STRING(100) },
        job_portfolio       : { type: Sequelize.STRING(100) },
        final_flag          : { type: Sequelize.STRING(10) },
        company_mark        : { type: Sequelize.STRING(100) },
        comity              : { type: Sequelize.STRING(30)},
        com_remark          : { type: Sequelize.STRING(100) },
        insert_by           : { type: Sequelize.STRING(11)},
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING(11) },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

