const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'cor_employee_master', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code    : { type: Sequelize.STRING },
        employee_code   : { type: Sequelize.STRING },
        employee_name   : { type: Sequelize.STRING },
        join_date       : { type: Sequelize.DATE },
        branch          : { type: Sequelize.STRING },
        division        : { type: Sequelize.STRING },
        department      : { type: Sequelize.STRING },
        designation     : { type: Sequelize.STRING },
        category        : { type: Sequelize.STRING },
        basic_pay       : { type: Sequelize.INTEGER },
        currency        : { type: Sequelize.STRING },
        pay_rule        : { type: Sequelize.INTEGER },
        gratuity_rule   : { type: Sequelize.INTEGER },
        leave_rule      : { type: Sequelize.INTEGER },
        pay_cycle       : { type: Sequelize.INTEGER },
        attend_flag     : { type: Sequelize.STRING }, 
        pay_mode        : { type: Sequelize.STRING },
        company_bank    : { type: Sequelize.STRING },
        emp_bank        : { type: Sequelize.STRING },
        account_no      : { type: Sequelize.STRING },
        account_type    : { type: Sequelize.STRING },
        bank_loan       : { type: Sequelize.STRING },
        rejoin          : { type: Sequelize.DATE },       
        process_flag    : { type: Sequelize.STRING },
        offer_letter    : { type: Sequelize.STRING },
        offer_date      : { type: Sequelize.DATE },
        join_rank       : { type: Sequelize.STRING },
        location        : { type: Sequelize.STRING },
        nationality     : { type: Sequelize.STRING },
        marital_status  : { type: Sequelize.STRING },
        spouse_name     : { type: Sequelize.STRING },
        spouse_birth    : { type: Sequelize.DATE },
        dependent       : { type: Sequelize.INTEGER },
        children        : { type: Sequelize.INTEGER },        
        birth_date      : { type: Sequelize.DATE },
        birth_place     : { type: Sequelize.STRING },
        sex             : { type: Sequelize.STRING },
        religion        : { type: Sequelize.STRING },
        height          : { type: Sequelize.INTEGER },
        weight          : { type: Sequelize.INTEGER },
        blood_group     : { type: Sequelize.STRING },
        voter_id        : { type: Sequelize.STRING },
        tin_no          : { type: Sequelize.STRING },
        passport_no     : { type: Sequelize.STRING },
        hobbies         : { type: Sequelize.STRING },        
        fredom_fighter  : { type: Sequelize.STRING },
        fredom_date     : { type: Sequelize.DATE },
        father_name     : { type: Sequelize.STRING },
        mother_name     : { type: Sequelize.STRING },
        emp_type        : { type: Sequelize.STRING },
        confirm_flag    : { type: Sequelize.STRING },
        confirm_date    : { type: Sequelize.STRING },
        emp_status      : { type: Sequelize.STRING },
        status_date     : { type: Sequelize.STRING },
        reference       : { type: Sequelize.STRING },
        email           : { type: Sequelize.STRING }, 
        contract_start  : { type: Sequelize.DATE }, 
        contract_expired: { type: Sequelize.DATE }, 
        approve_flag    : { type: Sequelize.STRING }, 
        approve_id      : { type: Sequelize.STRING }, 
        approve_date    : { type: Sequelize.STRING },      
        insert_by       : { type: Sequelize.STRING },
        insert_date     : { type: Sequelize.DATE },
        update_by       : { type: Sequelize.STRING },
        update_date     : { type: Sequelize.DATE } ,
    },     
    { timestamps: false, freezeTableName: true }
);

