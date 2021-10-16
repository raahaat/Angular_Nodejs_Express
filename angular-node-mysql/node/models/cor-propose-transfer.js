const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_transfer_propose', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        group_code          : { type: Sequelize.STRING },
        proposed_branch     : { type: Sequelize.STRING },
        proposed_division   : { type: Sequelize.STRING },
        proposed_department : { type: Sequelize.STRING },
        proposed_unit       : { type: Sequelize.STRING },
        proposed_fnd        : { type: Sequelize.STRING },
        order_flag          : { type: Sequelize.STRING },
        group_process       : { type: Sequelize.STRING },
        status              : { type: Sequelize.STRING },
        order_date          : { type: Sequelize.DATEONLY },
        serial_no           : { type: Sequelize.STRING },
        vol_transfer        : { type: Sequelize.STRING },
        check_idno          : { type: Sequelize.STRING },
        check_date          : { type: Sequelize.DATEONLY },
        old_branch          : { type: Sequelize.STRING },
        old_division        : { type: Sequelize.STRING },
        old_department      : { type: Sequelize.STRING },
        old_unit            : { type: Sequelize.STRING },
        old_func            : { type: Sequelize.STRING },
        job_posting         : { type: Sequelize.STRING },
        posting_flag        : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);

