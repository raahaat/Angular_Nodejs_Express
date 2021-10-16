const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_confirm_date_extend', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        designation     : { type: Sequelize.STRING },
        confirm_flag    : { type: Sequelize.STRING },
        document_date   : { type: Sequelize.DATE },
        old_confirm_date: { type: Sequelize.DATE },
        new_confirm_date: { type: Sequelize.DATE },
        remarks         : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);