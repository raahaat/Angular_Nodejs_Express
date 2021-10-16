const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'kpi_mark_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        serial   : { type: Sequelize.STRING },
        kpi_code   : { type: Sequelize.STRING },
        kpi_subject : { type: Sequelize.STRING },
        mark_code : { type: Sequelize.STRING },
        category_from : { type: Sequelize.STRING },
        category_to : { type: Sequelize.STRING },
        designation_from : { type: Sequelize.STRING },
        designation_to : { type: Sequelize.STRING },
        functional_designation : { type: Sequelize.STRING },
        fun_designation_flag : { type: Sequelize.STRING },
        branch_type : { type: Sequelize.STRING },
        grade_description : { type: Sequelize.STRING },
        grade_code : { type: Sequelize.STRING },
        self_apprisal : { type: Sequelize.STRING },
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);