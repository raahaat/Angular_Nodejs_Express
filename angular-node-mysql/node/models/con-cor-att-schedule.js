const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'con_cor_att_schedule', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        company_code: { type: Sequelize.STRING },
        schedule_code: { type: Sequelize.STRING },
        schedule_name: { type: Sequelize.STRING },
        start_date: { type: Sequelize.DATEONLY },
        end_date: { type: Sequelize.DATEONLY },
        in_time: { type: Sequelize.STRING },
        exit_time: { type: Sequelize.STRING },
        late_entry_time: { type: Sequelize.STRING },
        night_shift_flag: { type: Sequelize.STRING },
        valid_flag: { type: Sequelize.STRING },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);