const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_cor_leave_rule', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        rule_code: { type: Sequelize.STRING },
        rule_name: { type: Sequelize.STRING },
        leave_code: { type: Sequelize.STRING },
        negative_bal_flg: { type: Sequelize.STRING },
        leave_without_pay_flg: { type: Sequelize.STRING },
        leave_reserve_type: { type: Sequelize.STRING },
        reserve_lev_link_name: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);
