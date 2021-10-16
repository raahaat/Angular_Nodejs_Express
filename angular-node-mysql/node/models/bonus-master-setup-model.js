const Sequelize = require('sequelize');
const database = require('../database/db');

const Bmaster = database.define('con_bonus_master_setup', {
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
    bonus_serial_no: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    bonus_type_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    emp_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    emp_join_type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    designation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    percentage_of_pay:{
        type: Sequelize.DECIMAL,
        allowNull: false,
    },
    next_designation: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    next_designation_code: {
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
    },
    effective_date: {
        type: Sequelize.DATE,
        allowNull: true
    },
    expire_date: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {timestamps: false,
    freezeTableName: true });

module.exports = Bmaster;