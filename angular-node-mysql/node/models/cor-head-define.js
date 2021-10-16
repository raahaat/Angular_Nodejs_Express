const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_head_define', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        effective_date  : { type: Sequelize.DATE },
        expire_date     : { type: Sequelize.DATE },
        branch          : { type: Sequelize.STRING },
        division        : { type: Sequelize.STRING },
        department      : { type: Sequelize.STRING },
        functional_desg : { type: Sequelize.STRING },
        status          : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);