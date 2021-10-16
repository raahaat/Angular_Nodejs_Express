const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_cor_leave_auth', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        employee_group: { type: Sequelize.STRING },
        leave_type: { type: Sequelize.STRING },
        doc_number: { type: Sequelize.STRING },
        branch_office: { type: Sequelize.STRING },
        apply_leave_type: { type: Sequelize.STRING },
        effective_date: { type: Sequelize.DATEONLY },
        expire_date: { type: Sequelize.DATEONLY },
        lfa_flag: { type: Sequelize.STRING },
        reschedule_flag: { type: Sequelize.STRING },
        no_of_days: { type: Sequelize.INTEGER },
        no_of_approval: { type: Sequelize.INTEGER },
        insert_by: { type: Sequelize.STRING },      
        insert_date: { type: Sequelize.DATE },      
        update_by: { type: Sequelize.STRING },      
        update_date: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);