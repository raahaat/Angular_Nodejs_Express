const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_emp_id_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        auto_generate       : { type: Sequelize.STRING },
        id_length           : { type: Sequelize.STRING },
        id_prefix           : { type: Sequelize.STRING },
        id_suffix           : { type: Sequelize.STRING },
        sysdate_allow       : { type: Sequelize.STRING },
        sysdate_format      : { type: Sequelize.STRING },
        sysdate_position    : { type: Sequelize.STRING },
        file_no_allow       : { type: Sequelize.STRING },
        file_length         : { type: Sequelize.STRING },
        file_padding_with   : { type: Sequelize.STRING },
        file_padding_side   : { type: Sequelize.STRING },
        file_position       : { type: Sequelize.STRING },
        id_padding_allow    : { type: Sequelize.STRING },
        id_padding_with     : { type: Sequelize.STRING },
        id_padding_side     : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);