const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_rhm_erdd_adjust', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        code: { type: Sequelize.STRING },
        rev_code: { type: Sequelize.STRING }, 
        insert_by: { type: Sequelize.STRING } , 
        insert_date: { type: Sequelize.DATE },     
        update_by: { type: Sequelize.STRING } , 
        update_date: { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);