const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'disciplinary_action', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        employee_code : { type: Sequelize.STRING },
        effective_date : { type: Sequelize.DATEONLY },
        expire_date : { type: Sequelize.DATEONLY } ,     
        document_type : { type: Sequelize.STRING } ,     
        document_number : { type: Sequelize.STRING } ,  
        salary_flag : { type: Sequelize.STRING } ,  
        LFA_flag: { type: Sequelize.STRING } ,  
        bonus_flag: { type: Sequelize.STRING } ,  
        process_flag: { type: Sequelize.STRING } ,  
        insert_by : { type: Sequelize.STRING } ,  
        insert_date: { type: Sequelize.DATE } ,  
        update_by : { type: Sequelize.STRING } ,  
        update_date: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);