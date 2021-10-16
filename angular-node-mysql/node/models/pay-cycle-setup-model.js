const Sequelize = require('sequelize');
const database = require('../database/db');

const Paycycle = database.define('con_paycycle', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    company_code: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentMonth: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    currentYear: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paycycleNum: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING
    },
    attendanceFrom: {
        type: Sequelize.DATE,
        allowNull: false
    },
    attendanceTo: {
        type: Sequelize.DATE,
        allowNull: false
    },
    salaryProcessDate: {
        type: Sequelize.DATE
    },
    payCycleDesc: {
        type: Sequelize.STRING
    },
    totalDays: {
        type: Sequelize.INTEGER
    },
    workingDays: {
        type: Sequelize.INTEGER
    },
    workingHours: {
        type: Sequelize.INTEGER
    },
    totalWorkingHour: {
        type: Sequelize.INTEGER
    },
    payStatus : {
        type: Sequelize.STRING
    },

    payStartDate: {
        type: Sequelize.DATE
    },
    payEndDate: {
        type: Sequelize.DATE
    },
    postFlag: {
        type: Sequelize.STRING
    },
    glPostingStart: {
        type: Sequelize.DATE
    },
    glPostingEnd: {
        type: Sequelize.DATE
    },
    monthStatus: {
        type: Sequelize.STRING
    },
    extFlag: {
        type: Sequelize.STRING
    },
    insert_by: {
        type: Sequelize.STRING
    },
    insert_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    update_by: {
        type: Sequelize.STRING,
        allowNull: true
    },
    update_date: {
        type: Sequelize.DATE,
        allowNull: true
    }
 }, 
 {timestamps: false,
  freezeTableName: true }  
);

module.exports = Paycycle;