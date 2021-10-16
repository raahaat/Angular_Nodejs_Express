const Sequelize = require('sequelize');
const database = require('../database/db');

const Designation = database.define('con_designations', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    designationCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    designationName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    shortName: {
        type: Sequelize.STRING
    },
    designationRank: {
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
        defaultValue: 'DG'
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
   }, 
   {timestamps: false,
    freezeTableName: true });

module.exports = Designation;