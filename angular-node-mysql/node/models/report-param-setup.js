const Sequelize = require('sequelize');
const database = require('../database/db');

module.exports = database.define(
    'report_params_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        report_id   : { type: Sequelize.STRING },
        param_id    : { type: Sequelize.STRING },
        serial_no   : { type: Sequelize.INTEGER },
        insert_by   : { type: Sequelize.STRING },    
        insert_date : { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);