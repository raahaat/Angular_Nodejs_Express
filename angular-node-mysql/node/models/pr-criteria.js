const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_rhm_pr_criteria', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        designation_from: { type: Sequelize.STRING },
        change_type: { type: Sequelize.STRING }, 
        designation_to: { type: Sequelize.STRING } , 
        duration: { type: Sequelize.INTEGER } , 
        validation_from: { type: Sequelize.DATE } , 
        validation_to: { type: Sequelize.DATE } , 
        valid_flag: { type: Sequelize.STRING } , 
        insert_by: { type: Sequelize.STRING } , 
        insert_date: { type: Sequelize.DATE },     
        update_by: { type: Sequelize.STRING } , 
        update_date: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);