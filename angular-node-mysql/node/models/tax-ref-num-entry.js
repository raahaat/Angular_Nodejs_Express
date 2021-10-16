const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'tax_ref_number_entry', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code  : { type: Sequelize.STRING },
        employee_code : { type: Sequelize.STRING },

        employee_code : { type: Sequelize.STRING },
        ref_number    : { type: Sequelize.STRING },
        document_date : { type: Sequelize.DATEONLY },
        tax_code      : { type: Sequelize.STRING },
        year_from     : { type: Sequelize.STRING },   
        year_to       : { type: Sequelize.STRING }, 
        date_from     : { type: Sequelize.DATEONLY },     
        date_to       : { type: Sequelize.DATEONLY },    
        insert_by     : { type: Sequelize.STRING },
        insert_date   : { type: Sequelize.DATE },
        update_by     : { type: Sequelize.STRING },
        update_date   : { type: Sequelize.DATE } 
    },     
    { timestamps: false, freezeTableName: true }
);