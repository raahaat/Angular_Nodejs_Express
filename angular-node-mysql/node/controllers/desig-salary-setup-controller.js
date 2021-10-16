const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const desigSalarySetupModel = require('../models/con-desig-salary-setup');

exports.addDesigSalarySetup = async (req, res) => {
    for(let val of req.body.times) { 
 
        const formData = {
            //id              : req.body.id,
            company_code    : val.company_code,
            designation     : req.body.designation,
            effective_date  : req.body.effective_date,
            earning_code    : val.earning_code,
            amount          : val.amount,
            insert_by       : val.insert_by,
            insert_date     : val.insert_date 
        };

    if (val) {
        desigSalarySetupModel.create(formData)
        .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
        }).catch((err)=> {
            console.log('error');
        })
    }
        
    } //loop end
};

exports.getDesigWiseSalary = async (req, res) => {
    let companyCode = '200'
    try{
     let desigSalary =   
       await dbConnect.query(`SELECT a.id, a.designation, a.amount,
                                (SELECT designationName
                                   FROM con_designations
                                  WHERE company_code = a.company_code
                                    AND designationCode = a.designation) designationName,
                                a.effective_date,
                                a.earning_code,
                                (SELECT headName
                                   FROM con_earn_head
                                  WHERE company_code = a.company_code 
                                    AND headCode = a.earning_code) earning_head_name,
                                (SELECT designationRank
                                   FROM con_designations
                                  WHERE company_code = a.company_code
                                    AND designationCode = a.designation
                                    AND designationRank IS NOT NULL) designationRank
                             FROM con_desig_salary_setup a
                            WHERE company_code = '${companyCode}'
                              AND effective_date =
                                    (SELECT MAX(effective_date)
                                        FROM con_desig_salary_setup
                                        WHERE company_code = a.company_code
                                            AND designation = a.designation)
                            ORDER BY designationRank,
                                SUBSTR(a.earning_code, 0, 2) DESC,
                                SUBSTR(a.earning_code, 3)`
                    , {type: QueryTypes.SELECT})     
     return res.json(desigSalary);
    } catch (err) {
        console.log(err);
    }
}