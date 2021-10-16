const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_com_company_par', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        company_name: { type: Sequelize.STRING },
        comp_short_name: { type: Sequelize.STRING },
        company_logo: { type: Sequelize.STRING },
        company_address: { type: Sequelize.STRING },
        comp_contact_no: { type: Sequelize.STRING },
        company_mail: { type: Sequelize.STRING },
        company_website: { type: Sequelize.STRING },
        comp_social_net_site: { type: Sequelize.STRING },
        company_mail_ip: { type: Sequelize.STRING },
        retirement_age: { type: Sequelize.INTEGER },
        local_currency: { type: Sequelize.STRING },
        bank_ac_no: { type: Sequelize.STRING },
        defined_amount: { type: Sequelize.INTEGER },
        round_off_Type: { type: Sequelize.STRING },
        tax_cal_request: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);