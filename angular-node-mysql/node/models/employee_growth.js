const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'employee_growth', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        employee_code  : { type: Sequelize.STRING },
        document_type  : { type: Sequelize.STRING },
        document_sub_type : { type: Sequelize.STRING } ,     
        document_number : { type: Sequelize.STRING } ,     
        document_date : { type: Sequelize.DATEONLY } ,  
        effective_date : { type: Sequelize.DATEONLY } ,  
        release_date: { type: Sequelize.DATEONLY } ,  
        new_basic: { type: Sequelize.INTEGER } ,  
        new_grade: { type: Sequelize.STRING } ,  
        new_designation: { type: Sequelize.STRING } ,  
        new_category: { type: Sequelize.STRING } ,  
        new_cycle : { type: Sequelize.INTEGER } ,  
        new_branch: { type: Sequelize.STRING } , 
        new_division: { type: Sequelize.STRING } , 
        new_location: { type: Sequelize.STRING } , 
        new_salary_type: { type: Sequelize.STRING } , 
        reference: { type: Sequelize.STRING } , 
        new_employee_type: { type: Sequelize.STRING } , 
        arrear_amount: { type: Sequelize.INTEGER } , 
        arrear_date: { type: Sequelize.DATEONLY } , 
        increment_due_date: { type: Sequelize.DATEONLY} , 
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);