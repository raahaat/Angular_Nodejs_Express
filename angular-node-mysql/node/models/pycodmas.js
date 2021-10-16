const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'pycodmas', {
        code_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pyhdrcde: { type: Sequelize.STRING },
        pysofcde: { type: Sequelize.STRING },
        pycoddes: { type: Sequelize.STRING },
        pyheader: { type: Sequelize.STRING }     
    }, 
    {timestamps: false }
);