const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_professional_qualification', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        diploma             : { type: Sequelize.STRING },
        result              : { type: Sequelize.STRING },
        mark                : { type: Sequelize.INTEGER },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);