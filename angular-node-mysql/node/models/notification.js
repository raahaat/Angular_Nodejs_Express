const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'notification', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code        : { type: Sequelize.STRING },
        employee_code       : { type: Sequelize.STRING },
        applicant_id        : { type: Sequelize.STRING },
        document_date       : { type: Sequelize.DATEONLY },
        apply_date          : { type: Sequelize.DATEONLY },
        from_date           : { type: Sequelize.DATEONLY },
        end_date            : { type: Sequelize.DATEONLY },
        notification_type   : { type: Sequelize.STRING },
        notified_to         : { type: Sequelize.STRING },
        status              : { type: Sequelize.STRING },
        created_time        : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
);