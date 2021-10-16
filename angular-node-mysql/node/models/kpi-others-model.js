const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_others', {
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
        code                : { type: Sequelize.STRING(11) },
        score               : { type: Sequelize.DECIMAL(10,2) },
        self_mark           : { type: Sequelize.DECIMAL(10,2)},
        final_mark          : { type: Sequelize.DECIMAL(10,2) },
        insert_by           : { type: Sequelize.STRING(11)},
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING(11) },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

