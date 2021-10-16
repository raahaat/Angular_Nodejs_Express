const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'employee_growth_details', {
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
        earn_deduct_code: { type: Sequelize.STRING } ,
        old_amount: { type: Sequelize.INTEGER } ,  
        new_amount: { type: Sequelize.INTEGER } ,  
        rated_nonrated: { type: Sequelize.STRING } ,  
        pr_flag: { type: Sequelize.STRING } ,  
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);