const Sequelize = require('sequelize')
const database = require('../database/db')

module.exports = database.define(
  'stg_req_policy',
  {
    id: {type: Sequelize.INTEGER},
    company_code: {type: Sequelize.STRING},
    IDNAME:{type:Sequelize.STRING, nullAllow:false},
    vacancy_type:{type:Sequelize.STRING, nullAllow:true},
    document_date:{type: Sequelize.DATEONLY, nullAllow:true},
    min_education:{type: Sequelize.STRING, nullAllow:false},
    computer_literacy:{type: Sequelize.STRING, nullAllow:false},
    max_age:{type: Sequelize.STRING, nullAllow:false},
    apl_gender:{type: Sequelize.STRING, nullAllow:false},
    age_on_date:{type: Sequelize.DATEONLY, nullAllow:false},
    application_Start_Date:{type: Sequelize.DATEONLY, nullAllow:true},
    application_end_date:{type: Sequelize.DATEONLY, nullAllow:false},
    min_experience:{type: Sequelize.STRING, nullAllow:false},
    Pay_Order_Allowed:{type: Sequelize.STRING, nullAllow:false},
    Pay_Order_Amount:{type: Sequelize.STRING, nullAllow:false},
    Children_of_FF :{type: Sequelize.STRING, nullAllow:false},
    english_literacy :{type: Sequelize.STRING, nullAllow:false},
    third_division:{type: Sequelize.STRING, nullAllow:false},
    min_first_div:{type: Sequelize.STRING, nullAllow:false},
    banking_exp:{type: Sequelize.STRING, nullAllow:false},
    policy_id:{type: Sequelize.INTEGER, primaryKey: true,autoIncrement: true},
    insert_by: { type: Sequelize.STRING, defaultValue: Sequelize.NOW},
    insert_date:{type: Sequelize.DATEONLY},
    update_by:{type: Sequelize.STRING,},
    update_date:{type: Sequelize.DATEONLY}

  },
  { timestamps: false, freezeTableName: true } 
)
