const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'process_salary', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        employee_code  : { type: Sequelize.STRING },
        month  : { type: Sequelize.INTEGER },
        year : { type: Sequelize.INTEGER } ,     
        branch : { type: Sequelize.STRING } ,     
        salary_head : { type: Sequelize.STRING } ,     
        attend_type : { type: Sequelize.STRING } ,     
        from_date : { type: Sequelize.DATEONLY } ,  
        to_date : { type: Sequelize.DATEONLY } ,  
        amount: { type: Sequelize.INTEGER } ,  
        process_flag: { type: Sequelize.STRING } ,  
        working_hour: { type: Sequelize.INTEGER } ,  
        trn_code: { type: Sequelize.STRING } ,  
        rejoin_date: { type: Sequelize.DATEONLY } ,  
        ntrips: { type: Sequelize.INTEGER } ,  
        pay_cycle: { type: Sequelize.INTEGER } ,  
        act_code: { type: Sequelize.STRING } ,  
        category: { type: Sequelize.STRING } ,  
        bank_code: { type: Sequelize.STRING } ,  
        book_number: { type: Sequelize.STRING } ,   
        source: { type: Sequelize.STRING } ,  
        reference: { type: Sequelize.STRING } ,  
        authorized_by: { type: Sequelize.STRING } ,  
        authorized_date: { type: Sequelize.DATE } ,  
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);