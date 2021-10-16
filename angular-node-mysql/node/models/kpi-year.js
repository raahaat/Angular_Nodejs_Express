const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_year', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        kpi_year            : { type: Sequelize.INTEGER },
        year_type           : { type: Sequelize.STRING },
        type_code           : { type: Sequelize.STRING },
        from_date           : { type: Sequelize.DATEONLY },
        end_date            : { type: Sequelize.DATEONLY },
        year_status         : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);
