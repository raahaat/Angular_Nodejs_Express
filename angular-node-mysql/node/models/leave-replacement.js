const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'leave_replacement', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        serial              : { type: Sequelize.INTEGER },
        applicant_id        : { type: Sequelize.STRING },
        apply_date          : { type: Sequelize.DATEONLY },
        from_date           : { type: Sequelize.DATEONLY },
        end_date            : { type: Sequelize.DATEONLY },        
        leave_type          : { type: Sequelize.STRING },
        leave_code          : { type: Sequelize.STRING },
        leave_purpose       : { type: Sequelize.STRING },
        leave_status        : { type: Sequelize.STRING },
        replacement_id      : { type: Sequelize.STRING },
        replacement_flag    : { type: Sequelize.STRING },
        replacement_date    : { type: Sequelize.DATE },
        insert_by           : { type: Sequelize.STRING },
        insert_date         : { type: Sequelize.DATE } 
    },     
    { timestamps: false, freezeTableName: true }
);