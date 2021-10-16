const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'user_type', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },        
        company_code    : { type: Sequelize.STRING },
        user_id         : { type: Sequelize.STRING },
        user_type       : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        employee_name   : { type: Sequelize.STRING },
        email           : { type: Sequelize.STRING },
        user_status     : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);