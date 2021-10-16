const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'asset_cost_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        asset_code      : { type: Sequelize.STRING },
        asset_desc      : { type: Sequelize.STRING },
        cost_code       : { type: Sequelize.STRING },
        cost_desc       : { type: Sequelize.STRING },
        unit_measurement: { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);