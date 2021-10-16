const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_contract_extend', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        employee_code  : { type: Sequelize.STRING },
        old_start_date  : { type: Sequelize.DATEONLY },
        old_expire_date : { type: Sequelize.DATEONLY } ,     
        new_expire_date : { type: Sequelize.DATEONLY } , 
        insert_by    : { type: Sequelize.STRING },  
        insert_date  : { type: Sequelize.DATE },  
        update_by    : { type: Sequelize.STRING },  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);