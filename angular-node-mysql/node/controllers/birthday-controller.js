// const express = require('express');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');


exports.getBirthdayMessage = async (req, res) => {
  let company_code = '200';

  await dbConnect.query(`SELECT IF(COUNT(a.employee_name) = 0, 'There is no birthday today.',
                                IF(COUNT(a.employee_name) = 1, Concat(COUNT(a.employee_name) , ' people have birthday today'),
                                Concat(COUNT(a.employee_name) , ' peoples have their birthday today'))) birth_sms
                     FROM cor_employee_master a, ph_empstatus b
                    WHERE a.company_code = '${company_code}'
                     AND DATE_FORMAT(a.birth_date, '%d%m')= DATE_FORMAT(SYSDATE(), '%d%m')
                     AND b.COMPCDE = a.company_code
                     AND b.HRDCDE = 'ST'
                     AND a.emp_status = b.HEADCODE
                     AND b.DOPPRO = 'Y'`,
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

exports.getBirthdayList = async (req, res) => {
  let company_code = '200';

  await dbConnect.query(`SELECT a.employee_code emp_id,
                                a.employee_name emp_name,
                                b.shortName emp_desg,
                                IF(a.branch = '100', (Select description from con_grades 
                                              Where company_code = a.company_code
                                                And hard_code = 'GR'
                                                And gradeCode = a.division), a.branch) emp_branch,
                                Concat(truncate(TIMESTAMPDIFF(MONTH, a.birth_date, SYSDATE()) / 12, 0),' Years') emp_age
                          FROM cor_employee_master a,
                               con_designations b,
                               ph_empstatus c,
                               con_com_branchmaster d
                         WHERE a.company_code = '${company_code}'
                           AND DATE_FORMAT(a.birth_date, '%d%m')= DATE_FORMAT(SYSDATE(), '%d%m')
                           AND b.company_code = a.company_code
                           AND b.hard_code = 'DG'
                           AND a.designation = b.designationCode
                           AND c.COMPCDE = b.company_code
                           AND c.HRDCDE = 'ST'
                           AND a.emp_status = c.HEADCODE
                           AND c.DOPPRO = 'Y'
                           AND d.company_code = a.company_code
                           AND d.branch_code = a.branch
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

// exports.getBirthdayList = async (req, res) => {

//     let compCode = '200';
//     let connection
     
//     try {
//       connection = await oracledb.getConnection(dbConnect);

//       const result = await connection.execute(
//             `SELECT a.pyempcde emp_id,
//                     INITCAP (a.pyempnam) emp_name,
//                     b.pyheader emp_desg,
//                     INITCAP (DECODE (a.pydepcde, '100', dpr_code_desc ('999', a.pygrdcde), d.costdesc)) emp_branch,
//                     TRUNC (MONTHS_BETWEEN (SYSDATE, a.pyempdob) / 12) || ' Years' emp_age
//             FROM pyempmas a,
//                     pycodmas b,
//                     pycodmas c,
//                     syjobmas d
//             WHERE a.pycomcde = ${compCode}
//                 AND TO_CHAR (pyempdob, 'DDMM') = TO_CHAR (SYSDATE, 'DDMM')
//                 AND b.pycomcde = '999'
//                 AND b.pyhdrcde = 'DG'
//                 AND a.pydescde = b.pyhdrcde || b.pysofcde
//                 AND b.pyamount IS NOT NULL
//                 AND c.pycomcde = '999'
//                 AND c.pyhdrcde = 'ST'
//                 AND a.pystatus = c.pyhdrcde || c.pysofcde
//                 AND c.pydoppro = 'Y'
//                 AND d.compcode = a.pycomcde
//                 AND d.costcode = a.pydepcde
//             ORDER BY b.pyamount, a.pyempcde`
//       );

//       return res.send(result.rows);       
 
//     } catch (err) {
//       console.log('Ouch!', err);
//         res.json({isExecuted:false, message:"Error to get Employee List."});
//       } finally {
//         if (connection) { 
//           await connection.close();
//       }
//     }
// }