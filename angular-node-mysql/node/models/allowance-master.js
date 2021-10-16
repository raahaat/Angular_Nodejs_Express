const Sequelize = require('sequelize')
const database = require('../database/db');


module.exports = database.define(
    'allowance_master_setup', {
        
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code   : { type: Sequelize.STRING },
        allowance_code	   : { type: Sequelize.STRING },
        allowance_name   : { type: Sequelize.STRING },
        earning_head : { type: Sequelize.STRING },
        on_line_flag    : { type: Sequelize.STRING },
        insert_by    : { type: Sequelize.STRING },
        insert_date    : { type: Sequelize.DATE },
        update_by    : { type: Sequelize.STRING },
        update_date    : { type: Sequelize.DATE },
    },     
    { timestamps: false, freezeTableName: true }
);