const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_tax108_para', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        earning_code        : { type: Sequelize.STRING },
        earning_name        : { type: Sequelize.STRING },
        sequence_no         : { type: Sequelize.STRING },
        show_allowence      : { type: Sequelize.STRING },
        shown_summery       : { type: Sequelize.STRING },
        report_code         : { type: Sequelize.STRING },
        inserted_by         : { type: Sequelize.STRING },
        inserted_date       : { type: Sequelize.DATE },
        updated_by          : { type: Sequelize.STRING },
        updated_date        : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);