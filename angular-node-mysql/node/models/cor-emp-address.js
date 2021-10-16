const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_emp_address', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        dependent_no    : { type: Sequelize.INTEGER },
        address_type    : { type: Sequelize.STRING },
        address         : { type: Sequelize.STRING },
        district        : { type: Sequelize.STRING },
        upazila         : { type: Sequelize.STRING },
        post_office     : { type: Sequelize.STRING },
        country         : { type: Sequelize.STRING },
        post_code       : { type: Sequelize.INTEGER },
        phone_no        : { type: Sequelize.STRING },
        valid_status    : { type: Sequelize.STRING }, 
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);