// const express = require('express');
const { QueryTypes } = require('sequelize');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');

exports.getPromotionHistory = async (req, res) => {
  let compCode = '200';
  let empId = req.params.employeeId;

  await dbConnect.query(`SELECT IF(f.document_type = 'JN', 'Joining Info', 'Promotion')
                                  Tran_type, c.description designation,
                                        d.description job_grade,
                                            IFNULL(LAG(f.effective_date) OVER(ORDER BY f.effective_date, f.document_date),
                                                f.effective_date)        from_date,
                                                    f.effective_date              eff_date,
                                                    Concat(truncate(TIMESTAMPDIFF(MONTH,IFNULL(LAG(f.effective_date) OVER(ORDER BY f.effective_date, f.document_date),
                                                f.effective_date), f.effective_date) / 12, 0)," Yr(s) ",
                                  MOD (TIMESTAMPDIFF(MONTH,IFNULL(LAG(f.effective_date) OVER(ORDER BY f.effective_date, f.document_date),
                                                f.effective_date), f.effective_date) , 12)," Mon(s)") duration
                           FROM con_designations c,
                                 con_grades d,
                                 cor_employee_master e,
                                 employee_growth f
                          WHERE e.company_code ='${compCode}'
                            AND f.company_code = e.company_code
                            AND f.employee_code = e.employee_code
                            AND c.company_code = f.company_code
                            AND c.hard_code = 'DG'
                            AND c.designationCode = f.new_designation
                            AND d.company_code = c.company_code
                            AND d.hard_code = 'GR'
                            AND d.gradeCode = f.new_grade
                            AND f.document_type IN ('PR','JN')   
                            AND e.employee_code = '${empId}'
                            ORDER BY f.effective_date DESC
                            `,
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


exports.getPromotionInfo = async (req, res) => {
  let loginUser = req.params.pyostamp;
  let compCode = '200';

  await dbConnect.query(`SELECT c.description desg,
                                f.effective_date eff_date
                           FROM con_designations c,
                                con_grades d,
                                cor_employee_master e,
                                employee_growth f
                          WHERE f.company_code = '${compCode}'
                            and f.company_code = e.company_code
                            AND f.employee_code = e.employee_code
                            AND c.company_code = f.company_code
                            AND c.hard_code = 'DG'
                            AND c.designationCode = f.new_designation
                            AND d.company_code = f.company_code
                            AND d.hard_code = 'GR'
                            AND d.gradeCode = f.new_grade
                            AND f.document_type IN ('PR', 'JN')
                            AND e.employee_code = '${empId}'
                          ORDER BY f.effective_date DESC`,
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
