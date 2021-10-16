const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'earn_deduct_contribution', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        hard_code       : { type: Sequelize.STRING },
        soft_code       : { type: Sequelize.STRING },
        head_code       : { type: Sequelize.STRING },
        earning_code    : { type: Sequelize.STRING },
        lospayfl        : { type: Sequelize.STRING },
        category_code   : { type: Sequelize.STRING },
        percentile      : { type: Sequelize.INTEGER },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }  
    },     
    { timestamps: false, freezeTableName: true }
);