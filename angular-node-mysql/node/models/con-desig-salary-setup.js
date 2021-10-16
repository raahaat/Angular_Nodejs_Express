const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_desig_salary_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        rule_code       : { type: Sequelize.INTEGER },
        designation     : { type: Sequelize.STRING },
        effective_date  : { type: Sequelize.DATE },
        earning_code    : { type: Sequelize.STRING },
        amount          : { type: Sequelize.INTEGER },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);