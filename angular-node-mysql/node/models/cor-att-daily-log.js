const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'cor_att_daily_log', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        attendance_date: { type: Sequelize.DATEONLY},
        att_intime: { type: Sequelize.DATE},
        att_outtime: { type: Sequelize.DATE},
        late_flag: { type: Sequelize.STRING },
        early_exit_flag: { type: Sequelize.STRING },
        late_apr_flag: { type: Sequelize.STRING },
        early_exit_apr_flag: { type: Sequelize.STRING },
        approval_emp_id: { type: Sequelize.STRING },
        approval_date: { type: Sequelize.DATE },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);
