const Sequelize = require('sequelize')
const database = require('../database/db');


module.exports = database.define(
    'account_type_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code:       { type: Sequelize.STRING },
        hard_code:          { type: Sequelize.STRING },
        soft_code:          { type: Sequelize.STRING },
        account_type:       { type: Sequelize.STRING },
        code_description:   { type: Sequelize.STRING },
        account_type_code:  { type: Sequelize.STRING },
        account_gl_code:    { type: Sequelize.STRING },
        depend_code:        { type: Sequelize.STRING },
        insert_by:          { type: Sequelize.STRING },
        insert_date:        { type: Sequelize.DATE },
        update_by:          { type: Sequelize.STRING },
        update_date:        { type: Sequelize.DATE },
    },     
    { timestamps: false, freezeTableName: true }
);

