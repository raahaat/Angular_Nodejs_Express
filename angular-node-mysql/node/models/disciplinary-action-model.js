const Sequelize = require('sequelize');
const database = require('../database/db');

const Daction = database.define('con_disciplinary_action', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    company_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    employee_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    disciplinary_action_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    effective_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    expire_date: {
        type: Sequelize.DATE,
        allowNull: true
    },

    insert_by: {
        type: Sequelize.STRING,
        allowNull: true
    },
    insert_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    update_by: {
        type: Sequelize.STRING,
        allowNull: true
    },
    update_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    bonus_type_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
}, {timestamps: false,
    freezeTableName: true });

module.exports = Daction;