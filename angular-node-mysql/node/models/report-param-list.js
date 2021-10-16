const Sequelize = require('sequelize');
const database = require('../database/db');

module.exports = database.define(
    'report_params_list', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        param_name  : { type: Sequelize.STRING },
        data_type   : { type: Sequelize.STRING },
        parameter_code: { type: Sequelize.STRING },
        insert_by   : { type: Sequelize.STRING },    
        insert_date : { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);