const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'car_register', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        asset_code          : { type: Sequelize.STRING },
        car_register_date   : { type: Sequelize.DATEONLY },
        car_register_number : { type: Sequelize.STRING },
        car_id_number       : { type: Sequelize.STRING },
        remarks             : { type: Sequelize.STRING },
        action_flag         : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);