const Sequelize = require('sequelize')
const database = require('../database/db');


module.exports = database.define(
    'system_access', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code:       { type: Sequelize.STRING },
        user_code:          { type: Sequelize.STRING },
        branch_code:        { type: Sequelize.STRING },
        division_code:      { type: Sequelize.STRING },
        department_code:    { type: Sequelize.STRING },
        insert_by:          { type: Sequelize.STRING },
        insert_date:        { type: Sequelize.DATE },
        update_by:          { type: Sequelize.STRING },
        update_date:        { type: Sequelize.DATE },
    },     
    { timestamps: false, freezeTableName: true }
);