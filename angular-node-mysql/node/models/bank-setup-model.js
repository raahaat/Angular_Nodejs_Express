const Sequelize = require('sequelize');
//const database = require('../utilities/database');
const database = require('../database/db');

const Bank = database.define('banks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bankCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    bankName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    hard_code: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'BN'
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

module.exports = Bank;