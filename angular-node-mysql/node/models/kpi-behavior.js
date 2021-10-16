const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_behavior', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        period_from         : { type: Sequelize.DATEONLY },
        period_to           : { type: Sequelize.DATEONLY },
        kpi_year            : { type: Sequelize.STRING },
        behavior_type       : { type: Sequelize.STRING },
        behavior_code       : { type: Sequelize.STRING },
        score               : { type: Sequelize.DECIMAL },
        self_mark           : { type: Sequelize.DECIMAL },
        final_mark          : { type: Sequelize.DECIMAL },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);
