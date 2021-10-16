const Sequelize = require('sequelize');
const database = require('../database/db');

const Ehead = database.define('con_earn_head', {

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
    headCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    headName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    headType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentFrequency: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dependsOnAttendance: {
        type: Sequelize.STRING,
        allowNull: false
    },
    percentile: {
        type: Sequelize.STRING,
        allowNull: true
    },
    calculateOverTime: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fixedVariable: {
        type: Sequelize.STRING,
        allowNull: false
    },
    paymentMode: {
        type: Sequelize.STRING,
        allowNull: false
    },
    printOnPayslip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    leaveImpact: {
        type: Sequelize.STRING,
        allowNull: false
    },
    serialNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    bonusCalculation: {
        type: Sequelize.STRING,
        allowNull: false
    },
    affectGrossSalary: {
        type: Sequelize.STRING,
        allowNull: false
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
    }
},     
{ timestamps: false, freezeTableName: true }
);

module.exports = Ehead;