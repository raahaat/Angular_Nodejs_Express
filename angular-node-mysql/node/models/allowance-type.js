const Sequelize = require('sequelize')
const database = require('../database/db');


module.exports = database.define(
    'allowance_allowance_type', {
        
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code   : { type: Sequelize.STRING },
        allowance_code	   : { type: Sequelize.STRING },
        type_code   : { type: Sequelize.STRING },
        type_name  : { type: Sequelize.STRING },
        multi_time    : { type: Sequelize.STRING },
        insert_by    : { type: Sequelize.STRING },
        insert_date    : { type: Sequelize.DATE },
        update_by    : { type: Sequelize.STRING },
        update_date    : { type: Sequelize.DATE },
    },     
    { timestamps: false, freezeTableName: true }
);
