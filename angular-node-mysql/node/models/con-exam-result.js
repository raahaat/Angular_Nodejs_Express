const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_exam_result', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code: { type: Sequelize.STRING },
        hard_code   : { type: Sequelize.STRING },
        soft_code   : { type: Sequelize.STRING },
        description : { type: Sequelize.STRING },
        min_point   : { type: Sequelize.STRING }, 
        max_point   : { type: Sequelize.STRING },
        ranking     : { type: Sequelize.INTEGER },
        insert_by   : { type: Sequelize.STRING },
        insert_date : { type: Sequelize.DATE },
        update_by   : { type: Sequelize.STRING },
        update_date : { type: Sequelize.DATE } 
    },     
    { timestamps: false, freezeTableName: true }
);