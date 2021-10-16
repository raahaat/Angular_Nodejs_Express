const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_emp_experience', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        serial_no       : { type: Sequelize.INTEGER },
        designation     : { type: Sequelize.STRING },
        company         : { type: Sequelize.STRING },
        branch          : { type: Sequelize.STRING },
        work_area       : { type: Sequelize.STRING },
        achievement     : { type: Sequelize.STRING },
        from_date       : { type: Sequelize.DATE },
        to_date         : { type: Sequelize.DATE },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);