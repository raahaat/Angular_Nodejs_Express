const Sequelize = require('sequelize')
const database = require('../database/db');

module.exports = database.define(
    'test_document_master', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_code : { type: Sequelize.STRING },
        document_type  : { type: Sequelize.STRING },
        document_sub_type : { type: Sequelize.INTEGER } ,     
        document_desc : { type: Sequelize.STRING } ,     
        document_length : { type: Sequelize.INTEGER } ,  
        document_number : { type: Sequelize.STRING } ,  
        auto_flag: { type: Sequelize.STRING } ,  
        valid_flag: { type: Sequelize.STRING } ,
        insert_by    : { type: Sequelize.STRING } ,  
        insert_date  : { type: Sequelize.DATE } ,  
        update_by    : { type: Sequelize.STRING } ,  
        update_date  : { type: Sequelize.DATE }     
    }, 
    {timestamps: false,
     freezeTableName: true }
);