const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const SalaryHistory = require('../models/salary-history')
const { get } = require('../routes/list-of-values-route');
const processSalary = require('../models/process-salary');
const salaryHistory = require('../models/salary-history');



exports.getEmpListByParams = async (req, res) => {
    const branchCode = req.query.branch_code;
    const compCode = '200'
  
  await dbConnect.query(`SELECT id, company_code, employee_code, employee_name 
                           FROM cor_employee_master a
                          WHERE company_code = '${compCode}' 
                            AND branch = (CASE WHEN '${branchCode}' = 'All' THEN branch ELSE '${branchCode}' END)
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
    const branchCode = req.body.branch_code;
    const employeeCode = req.body.employee_code;
    const month = req.body.month;
    const year = req.body.year;
    const compCode = '200'

    await dbConnect.query(`SELECT ps.id, ps.employee_code, ps.company_code,ps.amount, ps.branch, 
                                  ps.salary_head, DATE(ps.transaction_date) AS transaction_date, 
                                  cem.employee_name, ccb.branch_name, ceh.headName, ps.source
                             FROM salary_history ps 
                             LEFT JOIN cor_employee_master cem on cem.employee_code = ps.employee_code
                             LEFT JOIN con_com_branchmaster ccb on ccb.branch_code = ps.branch
                             LEFT JOIN con_earn_head ceh on ceh.headCode = ps.salary_head
                            WHERE ps.company_code = '${compCode}'
                              AND ps.branch = (CASE WHEN '${branchCode}' = 'All' THEN ps.branch ELSE '${branchCode}' END)
                              AND ps.employee_code = (CASE WHEN '${employeeCode}' = 'All' THEN ps.employee_code ELSE '${employeeCode}' END)
                              AND ps.salary_head NOT IN ('ER990','DD990','ER999')
                              AND DATE_FORMAT( ps.transaction_date, '%m%Y') = CONCAT( LPAD('${month}',2,0),'${year}')
                            ORDER BY employee_code`,
                              {type: QueryTypes.SELECT})
          .then((getData)=> {
          if (getData) {                                  
            return res.json({isExecuted:true, data: getData});             
          } else {
              res.json(null);
          }
          }).catch((err)=> {
             console.log(`My Error: ${err}`);
             return res.json({isExecuted:false, message: "Error to get data!"});            
          })
  }

  exports.saveProcess = async (req, res) => {
    try {
    data =  req.body.data;
    fiteredDeleteData = data.filter(data=> data.status=='d')
    fiteredAdjustData = data.filter(data=> data.status=='a')
 
    if (fiteredAdjustData.length > 0) {
      fiteredAdjustData.forEach( async element => {
        await SalaryHistory.update({ 
                    amount:  element.amount
                  },
                  { where: { 
                      employee_code: element.employee_code, 
                      salary_head: element.salary_head, 
                      amount: element.old_amount, 
                      source: element.source,
                      transaction_date: element.transaction_date} }
              )

        if (element.earn_deduct == 'ER') {
          await SalaryHistory.update({ 
              amount:  Sequelize.literal(`amount + ${Number(element.difference)}`)
              },
              { where: { 
                  employee_code: element.employee_code, 
                  salary_head: 'ER990',  
                  source: element.source,
                  transaction_date: element.transaction_date}
              }
            )

            await SalaryHistory.update({ 
              amount:  Sequelize.literal(`amount + ${Number(element.difference)}`)
              },
              { where: { 
                  employee_code: element.employee_code, 
                  salary_head: 'ER999',  
                  source: element.source,
                  transaction_date: element.transaction_date}
              }
            )
        } else if (element.earn_deduct == 'DD') {
          await SalaryHistory.update({ 
            amount:  Sequelize.literal(`amount + ${Number(element.difference)}`)
            },
            { where: { 
                employee_code: element.employee_code, 
                salary_head: 'DD990',  
                source: element.source,
                transaction_date: element.transaction_date}
            }
          )

          await SalaryHistory.update({ 
            amount:  Sequelize.literal(`amount - ${Number(element.difference)}`)
            },
            { where: { 
                employee_code: element.employee_code, 
                salary_head: 'ER999',  
                source: element.source,
                transaction_date: element.transaction_date}
            }
          )
        }     
      })
    }

    if (fiteredDeleteData.length > 0) {
      fiteredDeleteData.forEach( async element => {
          await SalaryHistory.destroy(
                  { where: {  
                    employee_code: element.employee_code, 
                    salary_head:element.salary_head, 
                    amount: element.old_amount, 
                    source: element.source,
                    transaction_date: element.transaction_date} 
                  }
              )
  
        if (element.earn_deduct == 'ER') {
            await SalaryHistory.update({ 
              amount:  Sequelize.literal(`amount - ${Number(element.old_amount)}`)
              },
              { where: { 
                  employee_code: element.employee_code, 
                  salary_head: {[Op.in]: ['ER990','ER999']},  
                  source: element.source,
                  transaction_date: element.transaction_date}
              }
            )
        } else if (element.earn_deduct == 'DD') {
          await SalaryHistory.update({ 
            amount:  Sequelize.literal(`amount - ${Number(element.old_amount)}`)
            },
            { where: { 
                employee_code: element.employee_code, 
                salary_head: 'DD990',  
                source: element.source,
                transaction_date: element.transaction_date}
            }
          )
  
          await SalaryHistory.update({ 
            amount:  Sequelize.literal(`amount + ${Number(element.old_amount)}`)
            },
            { where: { 
                employee_code: element.employee_code, 
                salary_head: 'ER999',  
                source: element.source,
                transaction_date: element.transaction_date}
            }
          )
        }     
      })
    }
    return res.json({isExecuted: true, message : 'Successfully inserted.'})
  } catch (error) {
    console.log('Salary Reverse Error', error);
    return res.json({isExecuted: false, message : 'Salary Reverse Error!!!'})
  }
}