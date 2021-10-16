const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'other_allowance_entry', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        employee_code  : { type: Sequelize.STRING },
        salary_head  : { type: Sequelize.STRING },
        effective_date  : { type: Sequelize.DATEONLY },
        expiry_date : { type: Sequelize.DATEONLY } ,     
        amount : { type: Sequelize.INTEGER },     
        status : { type: Sequelize.STRING },  
        certificate_flag : { type: Sequelize.STRING },  
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);