const Sequelize = require('sequelize');
const database = require('../database/db');

const Bheldup = database.define('con_bonus_heldup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    employeeId: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING
    },

    effectiveDate: {
        type: Sequelize.DATEONLY,
        // get: function getDateWithoutTime(date) {
        //     return require('moment')(effectiveDate,'MM/DD/YYYY[T]HH:mm:ss').format('DD-MM-YYYY');
        // }
    },
    expireDate: {
        type: Sequelize.DATEONLY
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
        allowNull: true,
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
});

module.exports = Bheldup;