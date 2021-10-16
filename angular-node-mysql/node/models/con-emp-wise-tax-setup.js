const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_emp_wise_tax_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        effective_date  : { type: Sequelize.DATEONLY },
        expire_date  : { type: Sequelize.DATEONLY },
        designation  : { type: Sequelize.STRING },
        employee_code : { type: Sequelize.STRING } ,     
        desired_type : { type: Sequelize.STRING } ,     
        desired_amount : { type: Sequelize.INTEGER } ,  
        desired_percent : { type: Sequelize.DECIMAL } ,  
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);