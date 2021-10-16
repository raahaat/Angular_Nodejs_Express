const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');
const RiskAllowanceProcess = require('../models/pay-risk-allowance-process-model')
const { get } = require('../routes/list-of-values-route');



exports.getEmpListByParams = async (req, res) => {
    const branchCode = req.query.branch_code;
    const desig = req.query.designation;
    const compCode = '200'
  
  await dbConnect.query(`SELECT id, company_code, employee_code, employee_name 
                           FROM cor_employee_master a
                          WHERE company_code = '${compCode}' 
                            AND branch = (CASE WHEN '${branchCode}' = 'All' THEN branch ELSE '${branchCode}' END)
                            AND designation = (CASE WHEN '${desig}' = 'All' THEN designation ELSE '${desig}' END)
                            AND a.emp_status = (Select headcode
                                                  FROM ph_empstatus
                                                 WHERE compcde = a.company_code
                                                   AND doppro = 'Y'
                                                   AND headcode = a.emp_status)
                          ORDER BY employee_code`,
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

  exports.submitData = async (req, res) => {
    console.log(req.body);
    const branchCode = req.body.branch_code;
    const desig = req.body.designation;
    const employeeCode = req.body.employee_code;
    const compCode = '200'
    await dbConnect.query(`SELECT employee_code
                             FROM cor_employee_master a
                            WHERE company_code = '${compCode}' 
                              AND employee_code = (CASE WHEN '${employeeCode}' = 'All' THEN employee_code ELSE '${employeeCode}' END)
                              AND branch = (CASE WHEN '${branchCode}' = 'All' THEN branch ELSE '${branchCode}' END)
                              AND designation = (CASE WHEN '${desig}' = 'All' THEN designation ELSE '${desig}' END)
                              AND employee_code NOT IN (SELECT employee_code FROM pay_risk_allowance_process
                                                         WHERE company_code = a.company_code
                                                           AND month = ${req.body.cycle_month}
                                                           AND year = ${req.body.cycle_year})`, {type: QueryTypes.SELECT})
                          .then(async (getData)=> {
                            if (getData) {
                              ecode = getData.map(data => data.employee_code );
                              await dbConnect.query(`SELECT pra.employee_code, pra.company_code,pra.amount,cem.designation AS designation_code,cem.branch AS branch_code, cem.employee_name, ccb.branch_name,cd.designationName 
                                                       FROM pay_risk_allowance pra 
                                                       LEFT JOIN cor_employee_master cem on cem.employee_code = pra.employee_code
                                                       LEFT JOIN con_com_branchmaster ccb on ccb.branch_code = cem.branch
                                                       LEFT JOIN con_designations cd on cd.designationCode = cem.designation
                                                      WHERE pra.employee_code IN(${ecode.join()})
                                                      ORDER BY employee_code`,
                          {type: QueryTypes.SELECT}).then(data=>{
                            res.json({isExecuted:true, data: data});
                            res.end();
                          })                              
                          } else {
                            res.json(null);
                          }
                         }).catch((err)=> {
                          console.log(`My Error: ${err}`);
                         })
  }


  exports.saveProcess = async (req, res) => {
    data =  req.body.data;
    await RiskAllowanceProcess.bulkCreate(data)
    .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });
  }