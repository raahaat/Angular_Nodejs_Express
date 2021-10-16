const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_emp_education', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        edu_level       : { type: Sequelize.INTEGER },
        exam_name       : { type: Sequelize.STRING },
        board           : { type: Sequelize.STRING },
        result          : { type: Sequelize.STRING },
        grade_flag      : { type: Sequelize.STRING },
        outof           : { type: Sequelize.INTEGER },
        pass_year       : { type: Sequelize.STRING },
        group           : { type: Sequelize.STRING },
        subject         : { type: Sequelize.STRING },
        duration       : { type: Sequelize.INTEGER },
        institute       : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,  
    },     
    { timestamps: false, freezeTableName: true }
);