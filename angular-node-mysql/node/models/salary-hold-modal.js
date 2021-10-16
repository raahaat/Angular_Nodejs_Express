const Sequelize = require('sequelize')
const database = require('../database/db');

    module.exports = database.define(
        'pay_salary_hold', {
    id:                 { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    company_code:       { type: Sequelize.STRING },
    employee_code:      { type: Sequelize.STRING },
    effective_date:     { type: Sequelize.DATE }, 
    expire_date:        { type: Sequelize.DATE },  
    status_flag:        { type: Sequelize.STRING },
    insert_by:          { type: Sequelize.STRING },
    insert_date:        { type: Sequelize.DATE },
    update_by:          { type: Sequelize.STRING },
    update_date:        { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
    );
