const Sequelize = require('sequelize')
const database = require('../database/db')

module.exports = database.define(
  'stg_pref_subject',
  {
    id: {type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true},
    company_code: {type: Sequelize.STRING},
    subject_code:{type:Sequelize.STRING},
    policy_id:{type: Sequelize.INTEGER},
    insert_by: { type: Sequelize.STRING, defaultValue: Sequelize.NOW},
    insert_date:{type: Sequelize.DATEONLY},
    update_by:{type: Sequelize.STRING,},
    update_date:{type: Sequelize.DATEONLY}
  },
   { timestamps: false, freezeTableName: true }
)


