const Sequelize = require('sequelize');
const database = require('../database/db');

const Btype = database.define('con_bonus_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    btypeCode: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    btypeName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    company_code: {
        type: Sequelize.STRING,
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
    }
},{timestamps: false,
    freezeTableName: true });

module.exports = Btype;