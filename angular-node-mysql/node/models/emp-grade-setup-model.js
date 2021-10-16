const Sequelize = require('sequelize');
const database = require('../database/db');

const Grade = database.define('con_grades', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    gradeCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    gradeName: {
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
        defaultValue: 'GR'
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
    },
}, 
    {timestamps: false,
    freezeTableName: true });

module.exports = Grade;