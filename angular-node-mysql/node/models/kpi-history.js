const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_history', {
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
        head_serial         : { type: Sequelize.INTEGER },
        head_name           : { type: Sequelize.STRING },
        child_flag          : { type: Sequelize.STRING },
        child_serial        : { type: Sequelize.INTEGER },
        child_name          : { type: Sequelize.STRING },
        target_type         : { type: Sequelize.STRING },
        quantity_no         : { type: Sequelize.INTEGER },
        target              : { type: Sequelize.STRING },
        score               : { type: Sequelize.INTEGER },
        achievement         : { type: Sequelize.STRING },
        self_score          : { type: Sequelize.INTEGER },
        final_score         : { type: Sequelize.INTEGER },
        paten_code          : { type: Sequelize.INTEGER },
        achive_no           : { type: Sequelize.INTEGER },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);