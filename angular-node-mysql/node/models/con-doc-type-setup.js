const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'con_doc_type_setup', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code            : { type: Sequelize.STRING },
        doc_type                : { type: Sequelize.STRING },
        doc_sub_type            : { type: Sequelize.STRING },
        doc_location            : { type: Sequelize.STRING },
        doc_period_from         : { type: Sequelize.DATE },
        doc_period_to           : { type: Sequelize.DATE },
        doc_prefix              : { type: Sequelize.STRING },
        doc_lenght              : { type: Sequelize.INTEGER },
        doc_number              : { type: Sequelize.INTEGER },
        auto_flag               : { type: Sequelize.STRING },
        valid_flag              : { type: Sequelize.STRING },
        doc_desc                : { type: Sequelize.STRING },
        change_type             : { type: Sequelize.STRING },
        emp_active              : { type: Sequelize.STRING } ,  
        emp_status              : { type: Sequelize.STRING } ,     
        branch_change           : { type: Sequelize.STRING } ,  
        division_change         : { type: Sequelize.STRING } ,  
        department_change       : { type: Sequelize.STRING } ,  
        designation_change      : { type: Sequelize.STRING } ,  
        unit_change             : { type: Sequelize.STRING } ,  
        salary_incr_decr        : { type: Sequelize.STRING } ,  
        salary_change_type      : { type: Sequelize.STRING } ,  
        increment_forward       : { type: Sequelize.STRING } ,  
        inc_forward_count       : { type: Sequelize.INTEGER } , 
        insert_by               : { type: Sequelize.STRING } ,  
        insert_date             : { type: Sequelize.DATE } ,  
        update_by               : { type: Sequelize.STRING } ,  
        update_date             : { type: Sequelize.DATE } 
    }, 
    {timestamps: false,
     freezeTableName: true }
);