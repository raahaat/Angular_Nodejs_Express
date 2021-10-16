const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_com_branchmaster', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        branch_code: { type: Sequelize.STRING },
        branch_name: { type: Sequelize.STRING },
        branch_short: { type: Sequelize.STRING },
        address: { type: Sequelize.STRING },
        short_address: { type: Sequelize.STRING },
        mail_address: { type: Sequelize.STRING },
        opening_date: { type: Sequelize.DATEONLY },
        hand_over: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING },      
        insert_date: { type: Sequelize.DATE },      
        update_by: { type: Sequelize.STRING },      
        update_date: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);