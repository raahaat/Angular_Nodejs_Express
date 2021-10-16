const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_academic_qualification', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        edu_level           : { type: Sequelize.STRING },
        mark                : { type: Sequelize.INTEGER },
        hons_flag           : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);