// const express = require('express');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

exports.getAcademicData = async (req, res) => {
    let loginUser = req.params.pyostamp;
    let company_code = '200';
  
    await dbConnect.query(`Select edu_level levlcode,pass_year pyyrpass,
                                  (Select description from con_exams  
                                    where company_code = a.company_code
                                    and hard_code = 'SB'
                                    and examCode = a.exam_name) exam,  
                                  (Select Concat('In ',description) from con_com_subj
                                    Where company_code = a.company_code
                                    And hard_code = 'SD'
                                    And concat(hard_code,soft_code) = a.subject) subject, 
                                  IFNULL((Select description From con_exam_result
                                        Where company_code = a.company_code
                                        And hard_code = 'CL'
                                        And concat(hard_code,soft_code) = a.result),result) Result, 
                                  (Select Pycoddes from institute
                                    Where Pycomcde = a.company_code
                                     And Pyhdrcde = 'IN'
                                     And Pysofcde = a.institute) Institute
                                    from cor_emp_education a
                            Where company_code = '${company_code}'
                              And employee_code = '${loginUser}'
                         Order By edu_level Desc`,
                          {type: QueryTypes.SELECT})
                          .then((getData)=> {
                            if (getData) {
                              res.json({isExecuted:true, data: getData});
                              res.end();
                            } else {
                              res.json(null);
                            }
                          }).catch((err)=> {
                            console.log(`My Error: ${err}`);
                          })
  };

  exports.getAcademicForeignData = async (req, res) => {
    let loginUser = req.params.pyostamp;
    let company_code = '200';
  
    await dbConnect.query(`Select edu_level levlcode,pass_year pyyrpass,
                                  (Select description from con_exams  
                                    where company_code = a.company_code
                                    and hard_code = 'SB'
                                    and examCode = a.exam_name) exam,  
                                  (Select Concat('In ',description) from con_com_subj
                                    Where company_code = a.company_code
                                    And hard_code = 'SD'
                                    And concat(hard_code,soft_code) = a.subject) subject, 
                                  IFNULL((Select description From con_exam_result
                                        Where company_code = a.company_code
                                        And hard_code = 'CL'
                                        And concat(hard_code,soft_code) = a.result),result) Result, 
                                  (Select Pycoddes from institute
                                    Where Pycomcde = a.company_code
                                     And Pyhdrcde = 'IN'
                                     And Pysofcde = a.institute) Institute
                                    from cor_emp_edu_professional a
                            Where company_code = '${company_code}'
                              And employee_code = '${loginUser}'
                         Order By edu_level Desc`,
                          {type: QueryTypes.SELECT})
                          .then((getData)=> {
                            if (getData) {
                              res.json({isExecuted:true, data: getData});
                              res.end();
                            } else {
                              res.json(null);
                            }
                          }).catch((err)=> {
                            console.log(`My Error: ${err}`);
                          })
  };