const Sequelize = require('sequelize');
const { sequelize } = require('../database/db');
const database = require('../database/db');

module.exports = database.define(
    'ph_empstatus', {
        IDNO: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        IDNAME: { type: Sequelize.STRING },
        HRDCDE: { type: Sequelize.STRING },
        COMPCDE: { type: Sequelize.STRING },
        HEADCODE: { type: Sequelize.STRING },
        SOFCDE: { type: Sequelize.STRING },
        CODDES: { type: Sequelize.STRING },
        DOPPRO: { type: Sequelize.STRING },
        CREATEBY: { type: Sequelize.STRING }, 
        CREATEDT: { type: Sequelize.DATE },
        UPDATEBY: { type: Sequelize.STRING },
        UPDATEDT: { type: Sequelize.DATE}
    },     
    { timestamps: false, freezeTableName: true }
);