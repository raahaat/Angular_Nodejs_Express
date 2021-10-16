const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_details', {
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
        kpi_group           : { type: Sequelize.STRING },
        kpi_code            : { type: Sequelize.STRING },
        maximum_mark        : { type: Sequelize.DECIMAL },
        target_score        : { type: Sequelize.DECIMAL },
        self_mark           : { type: Sequelize.DECIMAL },
        final_mark          : { type: Sequelize.DECIMAL },
        serial              : { type: Sequelize.INTEGER },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);
