// const express = require('express');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

exports.getDivisionList = async (req, res) => {
  let company_code = '200';

  await dbConnect.query(`SELECT DISTINCT a.division branch_code,
                                (Select description from con_grades 
                                  Where company_code = a.company_code
                                    And hard_code = 'GR'
                                    And gradeCode = a.division) branch_name
                          FROM cor_employee_master a, ph_empstatus b
                         WHERE a.company_code = '${company_code}'
                          AND a.branch = '100'
                          AND b.COMPCDE = a.company_code
                          AND b.HRDCDE = 'ST'
                          AND a.emp_status = b.HEADCODE
                          AND b.DOPPRO = 'Y'
                        ORDER BY branch_name`,
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

exports.getBranchList = async (req, res) => {
  let company_code = '200';

  await dbConnect.query(`SELECT DISTINCT a.branch branch_code, (b.branch_name) branch_name
                           FROM cor_employee_master a, con_com_branchmaster b
                          WHERE a.company_code = '${company_code}'
                            AND a.company_code = b.company_code
                            AND a.branch = b.branch_code
                            AND a.branch <> '100'
                          ORDER BY b.branch_name`,
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

exports.getBranchWiseEmpList = async (req, res) => {
  let company_code = req.params.compcode;
  let branch_code = req.params.branch;

  await dbConnect.query(`SELECT a.employee_code emp_id, a.employee_name emp_name, b.shortName emp_desg
                           FROM cor_employee_master a, con_designations b, ph_empstatus c
                          WHERE a.company_code = '${company_code}'
                            AND IF(a.branch = '100', a.division, a.branch) = '${branch_code}'
                            AND b.company_code = a.company_code
                            AND b.hard_code = 'DG'
                            AND a.designation = b.designationCode
                            AND c.COMPCDE = a.company_code
                            AND c.HRDCDE = 'ST'
                            AND a.emp_status = c.HEADCODE
                            AND c.DOPPRO = 'Y'
                        ORDER BY b.designationRank, a.employee_code`,
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