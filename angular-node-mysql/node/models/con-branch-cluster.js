const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_branch_cluster', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        cluster_code    : { type: Sequelize.STRING },
        cluster_name    : { type: Sequelize.STRING },
        cluster_head    : { type: Sequelize.STRING },
        branch_code     : { type: Sequelize.STRING },
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE }    
    },     
    { timestamps: false, freezeTableName: true }
);