const Sequelize = require('sequelize');
const database = require('../database/db');

const Result = database.define('con_result', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    resultCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    resultName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    resultRank: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    company_code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hard_code: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'CL'
    },
    soft_code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    insert_by: {
        type: Sequelize.STRING,
        allowNull: true
    },
    insert_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    update_by: {
        type: Sequelize.STRING,
        allowNull: true
    },
    update_date: {
        type: Sequelize.DATE,
        allowNull: true
    }
});

module.exports = Result;