const Sequelize = require('sequelize');
const database = require('../database/db');

const BmasterDetails = database.define('con_bonus_master_details', {
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
    earning_code: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    earn_percentage:{
        type: Sequelize.DECIMAL,
        allowNull: false,
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
    
}, {timestamps: false,
    freezeTableName: true });

module.exports = BmasterDetails;