const Sequelize = require('sequelize')
const { sequelize } = require('../database/db')
const database = require('../database/db')

module.exports = database.define(
    'cor_emp_leave_final', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code      : { type: Sequelize.STRING },
        employee_code     : { type: Sequelize.STRING },
        leaveType         : { type: Sequelize.STRING },
        leaveCode         : { type: Sequelize.STRING },
        applyDate         : { type: Sequelize.DATEONLY },
        fromDate          : { type: Sequelize.DATEONLY },
        endDate           : { type: Sequelize.DATEONLY },
        startDate         : { type: Sequelize.DATEONLY },
        closeDate         : { type: Sequelize.DATEONLY },
        LFAFlag           : { type: Sequelize.STRING },
        LFAAmount         : { type: Sequelize.INTEGER },
        taxFlag           : { type: Sequelize.STRING },
        insert_by         : { type: Sequelize.STRING },
        insert_date       : { type: Sequelize.DATE },
        update_by         : { type: Sequelize.STRING },
        update_date       : { type: Sequelize.DATE }
    },     
    { timestamps: false, freezeTableName: true }
)