const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'cor_att_lat_approval', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        employee_code: { type: Sequelize.STRING },
        apply_date: { type: Sequelize.DATEONLY},
        late_att_date: { type: Sequelize.DATEONLY},
        approval_type: { type: Sequelize.STRING },
        reason_type: { type: Sequelize.STRING },
        reason: { type: Sequelize.STRING },
        remarks: { type: Sequelize.STRING },
        approval_emp_id: { type: Sequelize.STRING },
        approval_status: { type: Sequelize.STRING },
        approver_comment: { type: Sequelize.STRING },
        approval_date: { type: Sequelize.DATE },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);