const Sequelize = require('sequelize');
const database = require('../database/db');

const Exam = database.define('con_exam', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    examCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    examName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    examLevel: {
        type: Sequelize.STRING,
        allowNull: false
    },
    examRank: {
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
        defaultValue: 'SB'
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

module.exports = Exam;