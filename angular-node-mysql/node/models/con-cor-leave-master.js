const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_cor_leave_master', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        leave_code: { type: Sequelize.STRING },
        leave_name: { type: Sequelize.STRING },
        header_name: { type: Sequelize.STRING },
        applicable_to: { type: Sequelize.STRING },
        accumulation_flag: { type: Sequelize.STRING },
        accumulation_frequiency: { type: Sequelize.STRING },
        eligible_day: { type: Sequelize.INTEGER },
        work_days: { type: Sequelize.INTEGER },
        max_accumulation: { type: Sequelize.INTEGER },
        encashment_flag: { type: Sequelize.STRING },
        encashment_policy: { type: Sequelize.STRING },
        link_to_earns: { type: Sequelize.STRING },
        earning_code: { type: Sequelize.STRING },
        parcentage_to_pay: { type: Sequelize.INTEGER },
        leave_reserved_type: { type: Sequelize.STRING },
        reserved_leave_link: { type: Sequelize.STRING },
        esb_include_flag: { type: Sequelize.STRING },
        passage_eligible: { type: Sequelize.STRING },
        in_month_leave_gap: { type: Sequelize.INTEGER },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);