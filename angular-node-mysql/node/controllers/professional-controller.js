// const express = require('express');
const { QueryTypes } = require('sequelize');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');

exports.getSalary = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT e.employee_code,
                                    SUM(f.amount)           gross_salary,
                                    'Current Gross Salary'     Salary_type,
                                    1                          serialno
                                        FROM cor_emp_current_salary f, con_desig_salary_setup c, cor_employee_master e
                                        WHERE    f.company_code = ${compCode} 
                                            AND f.company_code = e.company_code
                                            AND f.employee_code = e.employee_code
                                            AND c.company_code = e.company_code
                                            AND c.designation = e.designation
                                            AND c.effective_date = (SELECT MAX(effective_date)
                                                                FROM con_desig_salary_setup
                                                                WHERE company_code = f.company_code
                                                                    AND designation = e.designation)
                                            AND c.earning_code = f.salary_head
                                            AND SUBSTR(f.salary_head, 1, 2) = 'ER'
                                            AND e.employee_code = '${empId}'
                                    GROUP BY e.employee_code
                                    UNION ALL
                                    SELECT e.employee_code,
                                            SUM(f.new_amount)            gross_salary,
                                            'Starting Gross Salary'     Salary_type,
                                            2                           serialno
                                        FROM employee_growth_details f, cor_employee_master e
                                    WHERE       f.company_code = ${compCode} 
                                            AND f.company_code = e.company_code
                                            AND f.employee_code = e.employee_code
                                            AND SUBSTR(f.earn_deduct_code, 1, 2) = 'ER'
                                            AND f.document_type = 'JN'
                                            AND e.employee_code = '${empId}'
                                    GROUP BY e.employee_code
                                    UNION ALL
                                    SELECT e.employee_code,
                                            0                                          gross_salary,
                                            'Last Salary in Previous Organization'     Salary_type,
                                            3                                          serialno
                                        FROM cor_employee_master e
                                    WHERE e.company_code = ${compCode} 
                                        AND e.employee_code = '${empId}'
                                    GROUP BY e.employee_code
                                    ORDER BY serialno`,
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
   
  exports.getLoan = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT e.employee_code, f.loan_final_amount LOAN_AMOUNT, 
                                    (Select headName From con_earn_head where company_code = f.company_code 
                                    and headCode = f.deduction_link_code) LOAN_TYPE,
                                            (SELECT branch_name
                                                FROM con_com_branchmaster
                                            WHERE company_code = f.company_code AND branch_code =  f.lender) LENDER_BRANCH
                                FROM pay_loans_advances f, cor_employee_master e
                                WHERE   f.company_code = '${compCode}'
                                    AND f.company_code = e.company_code
                                    AND f.employee_code = e.employee_code
                                    AND f.waived_flag = 'A'
                                    AND e.employee_code = '${empId}'`,
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
 
exports.getHistory = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT c.description designation,
                                    (SELECT branch_name
                                        FROM con_com_branchmaster
                                    WHERE company_code = f.company_code AND branch_code = f.new_branch) branch,
                                    d.description job_grade,
                                    IFNULL (LAG (f.effective_date) OVER (ORDER BY f.effective_date, f.document_date),
                                        f.effective_date) from_date,
                                    f.effective_date eff_date,
                                    DATEDIFF(f.effective_date , IFNULL (LAG (f.effective_date) OVER (ORDER BY f.effective_date, f.document_date),
                                    f.effective_date)) no_of_days,
                                    (SELECT doc_desc
                                        FROM con_doc_type_setup j
                                    WHERE     company_code = f.company_code
                                            AND j.doc_type = f.document_type
                                            AND j.doc_sub_type = f.document_sub_type) tran_type,
                                    '' supervisor, '' jobdesk
                                FROM con_designations c,
                                    con_grades d,
                                    cor_employee_master e,
                                    employee_growth f
                                WHERE       f.company_code = '${compCode}'
                                    AND f.company_code = e.company_code
                                    AND f.employee_code = e.employee_code
                                    AND c.company_code = f.company_code
                                    AND c.hard_code = 'DG'
                                    AND c.designationCode = f.new_designation
                                    AND d.company_code = f.company_code
                                    AND d.hard_code = 'GR'
                                    AND d.gradeCode = f.new_grade
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

exports.getExperience = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT (Select description from con_company_list where company_code = f.company_code and hard_code = 'CM' and soft_code = f.company)      organisation,
                                  (Select designationName from con_other_desigs where company_code = f.company_code and designationCode = f.designation )      designation,
                                  (Select description from con_department where company_code = f.company_code and dept_code = f.work_area)      grade,
                                  f.from_date fromdate,
                                  f.to_date todatefd,
                                  truncate (TIMESTAMPDIFF(MONTH,f.from_date,f.to_date) / 12, 0)     year,
                                  MOD (TIMESTAMPDIFF(MONTH,f.from_date,f.to_date) , 12)        months
                             FROM cor_employee_master e, cor_emp_experience f
                            WHERE f.company_code = '${compCode}'
                                  AND f.company_code = e.company_code
                                  AND f.employee_code = e.employee_code                 
                                  AND e.employee_code = '${empId}'
                         ORDER BY f.from_date DESC`,
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
