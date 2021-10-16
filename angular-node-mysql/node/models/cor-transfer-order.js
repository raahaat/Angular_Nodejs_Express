const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_transfer', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        document_date       : { type: Sequelize.DATE },
        effective_date      : { type: Sequelize.DATE },
        actual_eff_date     : { type: Sequelize.DATE },
        release_date        : { type: Sequelize.DATE },
        actual_rels_date    : { type: Sequelize.DATE },
        new_branch          : { type: Sequelize.STRING },
        old_branch          : { type: Sequelize.STRING },
        new_division        : { type: Sequelize.STRING },
        old_division        : { type: Sequelize.STRING },
        new_department      : { type: Sequelize.STRING },
        old_department      : { type: Sequelize.STRING },
        pystatus            : { type: Sequelize.STRING },
        pyempacp            : { type: Sequelize.STRING },
        release_flag        : { type: Sequelize.STRING },
        tr_reference        : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);