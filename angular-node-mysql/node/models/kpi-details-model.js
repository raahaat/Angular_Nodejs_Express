const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_details', {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING(8) },
        employee_code       : { type: Sequelize.STRING(30) },
        from                : { type: Sequelize.DATEONLY },
        to                  : { type: Sequelize.DATEONLY },
        year                : { type: Sequelize.STRING(10) },
        kpi_group           : { type: Sequelize.STRING(30) },
        code                : { type: Sequelize.STRING(11) },
        max_mark            : { type: Sequelize.DECIMAL(10,2) },
        self_mark           : { type: Sequelize.DECIMAL(10,2) },
        final_mark          : { type: Sequelize.DECIMAL(10,2) },
        serial              : { type: Sequelize.INTEGER(10) },
        insert_by           : { type: Sequelize.STRING(11) },
        insert_date         : { type: Sequelize.DATE},
        update_by           : { type: Sequelize.STRING(11) },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

