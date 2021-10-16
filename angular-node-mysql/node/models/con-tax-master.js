const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_tax_master', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        effective_date      : { type: Sequelize.DATE },
        expire_date         : { type: Sequelize.DATE },
        tax_class           : { type: Sequelize.STRING },
        yearly_min_tax      : { type: Sequelize.DECIMAL },
        yearly_max_tax      : { type: Sequelize.DECIMAL },
        rebate_calc         : { type: Sequelize.STRING },
        actual_tax_calc     : { type: Sequelize.STRING },
        tax_head_code       : { type: Sequelize.STRING },
        tax_on_arrear       : { type: Sequelize.STRING },
        arrear_calc_method  : { type: Sequelize.STRING },
        status              : { type: Sequelize.STRING },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE },
        update_by           : { type: Sequelize.STRING },
        update_date         : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);