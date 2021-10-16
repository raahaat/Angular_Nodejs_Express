const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_voluntary_transfer', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        document_date       : { type: Sequelize.DATEONLY },
        old_branch          : { type: Sequelize.STRING },
        old_division        : { type: Sequelize.STRING },
        old_department      : { type: Sequelize.STRING },
        old_unit            : { type: Sequelize.STRING },
        old_func            : { type: Sequelize.STRING },
        new_branch          : { type: Sequelize.STRING },
        new_division        : { type: Sequelize.STRING },
        new_department      : { type: Sequelize.STRING },
        new_unit            : { type: Sequelize.STRING },
        new_func            : { type: Sequelize.STRING },
        new_branch          : { type: Sequelize.STRING },
        reason              : { type: Sequelize.STRING },
        status              : { type: Sequelize.STRING },
        approve_by          : { type: Sequelize.STRING },
        approve_date        : { type: Sequelize.DATE },
        group_code          : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);
