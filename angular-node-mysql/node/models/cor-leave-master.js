const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_leave_master', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        leave_code      : { type: Sequelize.STRING },
        yearly_balance  : { type: Sequelize.INTEGER },
        leave_avail     : { type: Sequelize.INTEGER },
        leave_encash    : { type: Sequelize.INTEGER },
        acr_date        : { type: Sequelize.DATE },
        eligible_start  : { type: Sequelize.DATE },
        eligible_end    : { type: Sequelize.DATE },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);