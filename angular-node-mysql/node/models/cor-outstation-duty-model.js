const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_outstation_duty', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING(8) },
        employee_code       : { type: Sequelize.STRING(30) },
        apply_for           : { type: Sequelize.STRING(10) },
        apply_date          : { type: Sequelize.DATEONLY },
        absent_from         : { type: Sequelize.DATEONLY },
        absent_to           : { type: Sequelize.DATEONLY },
        approver_code       : { type: Sequelize.STRING(30) },
        apply_status        : { type: Sequelize.STRING(10) },
        remark              : { type: Sequelize.STRING(255) },
        approver_comment    : { type: Sequelize.STRING(255) },
        approver_date       : { type: Sequelize.DATE },
        reason              : { type: Sequelize.STRING(255) },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

