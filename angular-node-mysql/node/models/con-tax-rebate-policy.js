const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_tax_rebate_policy', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        effective_date      : { type: Sequelize.DATE },
        expire_date         : { type: Sequelize.DATE },
        serial_no           : { type: Sequelize.INTEGER },
        percent_of_invest   : { type: Sequelize.DECIMAL },
        minimum_invest      : { type: Sequelize.DECIMAL },
        maximum_invest      : { type: Sequelize.DECIMAL },
        percent_of_rebate   : { type: Sequelize.DECIMAL },
        minimum_rebate      : { type: Sequelize.DECIMAL },
        maximum_rebate      : { type: Sequelize.DECIMAL },
        status              : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);
