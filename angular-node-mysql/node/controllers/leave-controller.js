// const express = require('express');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

exports.getLeave = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT b.leave_name leave_type,
                                  ifnull(c.yearly_balance,0) + ifnull(c.leave_avail,0) total_leave,
                                  ifnull(c.leave_avail,0) leave_availed,
                                  ifnull(c.yearly_balance,0) balance
                             FROM con_cor_leave_rule  a,
                                    con_cor_leave_master  b,
                                    cor_leave_master  c,
                                    cor_employee_master  e
                            WHERE   a.company_code = '${compCode}'
                              AND b.company_code = a.company_code
                              AND b.IDNAME = 'LV'
                              AND a.leave_code = b.leave_code
                              AND a.company_code = c.company_code
                              AND a.leave_code = c.leave_code
                              AND c.company_code = e.company_code
                              AND c.employee_code = e.employee_code
                              AND a.rule_code =
                                (SELECT leave_rule
                                    FROM cor_employee_master
                                    WHERE company_code = a.company_code AND employee_code = e.employee_code)
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

exports.getLeaveDetails = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT b.description    leave_type,
                                  c.from_date    from_date,
                                  c.end_date    TO_DATE,
                                  (SELECT concat(employee_name,' - ',employee_code)
                                    FROM cor_employee_master
                                    WHERE company_code = c.company_code 
                                      AND employee_code = c.approver1_code) approve_by
                             FROM con_leave_type b, cor_leave_detail c, cor_employee_master e
                             WHERE c.company_code = '${compCode}'
                               AND b.company_code = c.company_code
                               AND b.hard_code = 'LT'
                               AND concat(b.hard_code,b.soft_code) = c.leave_type_code
                               AND c.company_code = e.company_code
                               AND c.employee_code = e.employee_code
                               AND c.leave_status = 'CLO'
                               AND e.employee_code = '${empId}'
                             Order by c.apply_date desc`,
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