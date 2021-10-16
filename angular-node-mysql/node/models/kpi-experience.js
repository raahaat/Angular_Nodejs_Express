const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_experience', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        per_year            : { type: Sequelize.INTEGER },
        mark                : { type: Sequelize.INTEGER },
        max_mark            : { type: Sequelize.INTEGER },
        same_designation    : { type: Sequelize.STRING },
        calculation_on      : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);