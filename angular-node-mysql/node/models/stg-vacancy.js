const Sequelize = require('sequelize')
const database = require('../database/db.js')

module.exports = database.define(
  'con-stg-vacancy',
  {
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    company_code: {type: Sequelize.STRING},
    hard_code: {type: Sequelize.STRING },
    soft_code: {type: Sequelize.STRING},
    description: {type: Sequelize.STRING},
    insert_by: { type: Sequelize.STRING,defaultValue: Sequelize.NOW},
    insert_date:{type: Sequelize.DATEONLY},
    update_by:{type: Sequelize.STRING},
    update_date:{type: Sequelize.DATEONLY}
  },
   { timestamps: false, freezeTableName: true }
)
