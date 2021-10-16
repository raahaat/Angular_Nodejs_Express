const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'asset_depend_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        asset_code          : { type: Sequelize.STRING },
        asset_description   : { type: Sequelize.STRING },
        depend_on_code      : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);