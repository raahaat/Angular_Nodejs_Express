const Sequelize = require('sequelize');
const database = require('../database/db');

const Ehead = database.define('con_head_dependencies', {

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
    dependsOnHead: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dependentHead: {
        type: Sequelize.STRING,
        allowNull: false
    },

    percentage: {
        type: Sequelize.INTEGER,
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
});

module.exports = Ehead;