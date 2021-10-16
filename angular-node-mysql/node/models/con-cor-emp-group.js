const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_cor_emp_group', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        assign_name  : { type: Sequelize.STRING },
        assign_type  : { type: Sequelize.STRING },
        assign_code  : { type: Sequelize.STRING } ,     
        serial       : { type: Sequelize.INTEGER } ,     
        division     : { type: Sequelize.STRING } ,  
        group_type   : { type: Sequelize.STRING } ,  
        employee_code: { type: Sequelize.STRING } ,  
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);