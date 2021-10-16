
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const processSalaryModel = require('../models/process-salary')
const employeeModel = require('../models/cor-employee-master');
const companyParModel = require('../models/con-com-company-par');
const payCycleModel = require('../models/pay-cycle-setup-model');
const taxMasterModel = require('../models/con-tax-master');
const taxHistoryModel = require('../models/con-emp-tax-history');
const empCurrentSalary = require('../models/cor-emp-current-salary');
const empOvertimeModel = require('../models/employee-overtime');
const empDailyAttModel = require('../models/emp-daily-attendance');
const earnDeductContModel = require('../models/earn-deduct-contribution');
const empGrowthModel = require('../models/employee-growth');
const empGrowthDetailModel = require('../models/employee-growth-details');
const disActionModle = require('../models/disciplinary_action');
const variableTransactionModle = require('../models/variable-transaction');
const salaryHistoryModel = require('../models/salary-history');


exports.salaryProcess = async (req, res) => {
  const formValue = req.body[0];
  const cycleValue = req.body[1];
  const companyCode = formValue.company_code;
  const employeeCode = formValue.employee_code;
  const payCycle = formValue.pay_cycle;
  const branchCode = formValue.branch_code;
  const desigFrom = formValue.designation_from;
  const desigTo = formValue.designation_to;
  const processFlag = formValue.udpate_mode;
  const currentUser = formValue.insert_by;
  const currentMonth = cycleValue.currentMonth;
  const currentYear = cycleValue.currentYear;
  const paycycleNum = cycleValue.paycycleNum;
  const attendanceFrom = new Date(cycleValue.attendanceFrom);
  const attendanceTo = new Date(cycleValue.attendanceTo);
  const rawAttendanceFrom = cycleValue.attendanceFrom;
  const rawAttendanceTo = cycleValue.attendanceTo;
  const category = cycleValue.category;
  const totalDays = cycleValue.totalDays;
  const workingHours = cycleValue.workingHours;
  const payStatus = cycleValue.payStatus;
  const monthStatus = cycleValue.monthStatus;

  var finalAmount = 0;
  var isTaxCalculate = true; 
  var isAttendance = true; 
  var isSuccess = true; 
  var isPfSuccess = true; 
  var isFetchStatus = true; 
  var salSuccessError = [];
  var nextProcessStartDate = rawAttendanceFrom;
  var empNetSalary = 0;

  async function finalMessage (success) {
    if (success) {
      salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
             desigName: i.designationName, netSalary: empNetSalary, isProcess: true, message: ''});
    } else {
      salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
             desigName: i.designationName, netSalary: null, isProcess: false, message: 'Error to generate salary.'});
    }
  };

  async function deleteSalaryProcess ( 
                delCompCode, delEmpCode,
                delCurMonth, delCurYear,
                delProcessFlag) {

    await processSalaryModel.destroy({
      where: {
        company_code: delCompCode,
        employee_code: delEmpCode,
        month: delCurMonth,
        year: delCurYear,
        process_flag: delProcessFlag
      }
     }).catch((err)=>{
        res.json({ isExecuted: false, message: `Error to delete salary of ${delEmpCode} !!!`});
        throw new Error(`Error to delete salary of ${delEmpCode} !!!`);
     }); 
  };

  async function updatePayCycle(
                 cycleCompCode, cycleCategory, 
                 cycleCurMonth, cycleCurYear, 
                 cyclePayNum, cycleProcessFlag, 
                 cycleCurUser) {
  let cycleStatus = 
      await dbConnect.query(
          `SELECT payStatus
             FROM con_paycycle
            WHERE company_code = '${cycleCompCode}'
              AND paycycleNum = ${cyclePayNum}
              AND category = '${cycleCategory}'
              AND currentMonth = '${cycleCurMonth}'
              AND currentYear = '${cycleCurYear}'`, 
            {type: QueryTypes.SELECT, plain: true}
            ).then((cycle)=> {
              if (cycle) {
                return cycle.payStatus;
              } else {
                res.json({isExecuted: false, message:`Pay Cycle status not found for ${cyclePayNum}!`})
                throw new Error(`Pay Cycle status not found for ${cyclePayNum}!`);
              }
            })
  if (cycleStatus === 'N') {
    let empCount = 
      dbConnect.query(`SELECT COUNT(employee_code) as countEmp
                         FROM cor_employee_master a, con_paycycle c
                        WHERE NOT EXISTS (SELECT 'X' FROM process_salary 
                                           WHERE company_code = a.company_code
                                             AND employee_code = a.employee_code
                                             AND month = c.currentMonth
                                             AND year = c.currentYear
                                             AND pay_cycle = c.paycycleNum
                                             AND category = c.category
                                             AND branch = a.branch)
                            AND a.company_code = '${cycleCompCode}'
                            AND a.employee_code LIKE '%%'
                            AND a.pay_cycle = ${cyclePayNum}
                            AND a.process_flag = 'N'
                            AND a.category = '${cycleCategory}'
                            AND a.company_code = c.company_code
                            AND a.pay_cycle = c.paycycleNum
                            AND a.category = c.category
                            AND c.payStatus = 'N'
                            AND c.monthStatus = 'N'
                            AND c.currentMonth = '${cycleCurMonth}'
                            AND c.currentYear = '${cycleCurYear}'
                            AND c.attendanceFrom >= a.join_date
                            AND a.emp_status = (Select headcode
                                                  FROM ph_empstatus
                                                 WHERE compcde = a.company_code
                                                   AND doppro = 'Y'
                                                   AND headcode = a.emp_status)
                            AND a.employee_code NOT IN (                  
                                    SELECT DISTINCT employee_code
                                              FROM cor_emp_leave_final
                                              WHERE company_code = '${cycleCompCode}'
                                                AND employee_code = a.employee_code
                                                AND leaveCode IN (
                                                      SELECT code
                                                        FROM con_code_master
                                                        WHERE company_code = '${cycleCompCode}'
                                                          AND hard_code = 'LV')
                                                        --  AND IFNULL (pynhours, 0) = 0) -- (need to edit in future -- arif)
                                                AND startDate <= DATE("${rawAttendanceFrom}") 
                                                AND closeDate >= DATE("${rawAttendanceTo}"))`,
                      {type: QueryTypes.SELECT, plain : true})
                      .then((count)=> {
                        if (count) {
                          return count.countEmp;
                        } else {
                          return 0;
                        }
                      })

    // let empCountFromHistory = 
    //   dbConnect.query(`SELECT COUNT(employee_code) as countEmp
    //                     FROM cor_employee_master a, con_paycycle c
    //                     WHERE a.company_code = '${cycleCompCode}'
    //                       AND a.employee_code LIKE '%%'
    //                       AND a.pay_cycle = ${cyclePayNum}
    //                       AND a.process_flag = 'N'
    //                       AND a.category = '${cycleCategory}'
    //                       AND a.company_code = c.company_code
    //                       AND a.pay_cycle = c.paycycleNum
    //                       AND a.category = c.category
    //                       AND c.payStatus = 'N'
    //                       AND c.monthStatus = 'N'
    //                       AND c.currentMonth = '${cycleCurMonth}'
    //                       AND c.currentYear = '${cycleCurYear}'
    //                       AND c.attendanceFrom >= a.join_date
    //                       AND a.emp_status = (Select headcode
    //                                             FROM ph_empstatus
    //                                            WHERE compcde = a.company_code
    //                                              AND doppro = 'Y'
    //                                              AND headcode = a.emp_status)
    //                       AND Exists (Select 'X'                                                       
    //                                     From salary_history
    //                                    Where company_code = '200'
    //                                      And employee_code = a.employee_code
    //                                      And DATE_FORMAT(transaction_date,"%m%Y") = CONCAT(LPAD('${cycleCurMonth}',2,0),'${cycleCurYear}'))
    //                       AND a.employee_code NOT IN (                  
    //                               SELECT DISTINCT employee_code
    //                                         FROM cor_emp_leave_final
    //                                         WHERE company_code = '${cycleCompCode}'
    //                                           AND employee_code = a.employee_code
    //                                           AND leaveCode IN (
    //                                                 SELECT code
    //                                                   FROM con_code_master
    //                                                   WHERE company_code = '${cycleCompCode}'
    //                                                     AND hard_code = 'LV')
    //                                                   --  AND IFNULL (pynhours, 0) = 0) -- (need to edit in future -- arif)
    //                                           AND startDate <= DATE("2020-12-01") 
    //                                           AND closeDate >= DATE("2020-12-30"))`,
    //                 {type: QueryTypes.SELECT, plain : true})
    //                 .then((count)=> {
    //                   if (count) {
    //                     return count.countEmp;
    //                   } else {
    //                     return 0;
    //                   }
    //                 }) 

    let empCountFromHistory = 
      dbConnect.query(`SELECT COUNT(a.employee_code) as countEmp
                         FROM cor_employee_master a, ph_empstatus b, con_paycycle c
                        WHERE a.company_code = '${cycleCompCode}'
                          AND a.employee_code LIKE '%%'
                          AND a.pay_cycle = ${cyclePayNum}
                          AND a.process_flag = 'N'
                          AND a.category = '${cycleCategory}'
                          AND a.company_code = c.company_code
                          AND a.pay_cycle = c.paycycleNum
                          AND a.category = c.category
                          AND c.payStatus IN ('N', 'S')
                          AND c.monthStatus = 'N'
                          AND c.currentMonth = ${cycleCurMonth}
                          AND c.currentYear = ${cycleCurYear}
                          AND b.compcde = a.company_code
                          AND b.HRDCDE = 'ST'
                          AND a.emp_status = b.headcode
                          AND b.doppro = 'Y'`,
                    {type: QueryTypes.SELECT, plain : true})
                    .then((count)=> {
                      if (count) {
                        return count.countEmp;
                      } else {
                        return 0;
                      }
                    })  
     if (empCountFromHistory === 0) {
        await payCycleModel.update(
          {payStatus: 'Y'},
          {where: {
              company_code: cycleCompCode,
              paycycleNum: cyclePayNum,
              category: cycleCategory,
              monthStatus: 'N',
              currentMonth: cycleCurMonth,
              currentYear: cycleCurYear,
              payStatus: {[Op.in]: ['N','S']}
          }}
        ).catch((err)=> {
          res.json({isExecuted: false, message:`Status update error for ${cyclePayNum} pay cycle!`})
          throw new Error(`Status update error for ${cyclePayNum} pay cycle!`);
        })
      }                                        
   } 
   isSuccess = true;           
  };


  

  async function creatingBackup(backupCompCode, backupEmpCode,
                                backupCategory, backupPaymode,
                                backupBankCode, backupCurMonth,
                                backupCurYear, backupPayCycle,
                                backupProcessFlag) {
   if (empNetSalary !== 0) {                                 
    await processSalaryModel.findAll({
                  where: {
                    company_code: backupCompCode,
                    employee_code: backupEmpCode,
                    pay_cycle: backupPayCycle,
                    month: backupCurMonth,
                    year: backupCurYear,
                    process_flag: {[Op.in]: ['Y','P']}
                  }
                })
                .then((empProcessSalary)=> {
                  for (sal of empProcessSalary) {
                    let salData = {
                      company_code: sal.company_code,
                      employee_code: sal.employee_code,
                      transaction_date: new Date(),
                      branch: sal.branch,
                      salary_head: sal.salary_head,
                      working_hours: sal.working_hour,
                      // percentile :,
                      branch_dep: i.branch ,
                      category: sal.category,
                      attendance_flag: i.attend_flag,
                      amount : sal.amount,
                      pay_mode: backupPaymode,
                      process_flag: backupProcessFlag,
                      source: sal.source,
                      insert_by: currentUser,
                      insert_date: new Date() 
                    }
                    salaryHistoryModel.create(salData)
                    .catch((err)=> {
                      salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                        desigName: i.designationName, netSalary: null, isProcess: false, 
                        message: `Salary history insertion error.!`});
                      isSuccess = false;
                    })
                  }
                })
      if (!isSuccess) {
        return false;
      }
    }                                             
  };

  async function checkPFAmount(
                 pfCompCode, pfEmpCode,
                 pfCategory, pfCurMonth,
                 pfCurYear, pfProcessFlag,
                 pfPayCycle) {
  let pfHead = 
    await dbConnect.query(`Select a.headCode  
                             From con_earn_head a,  earn_deduct_contribution b
                            Where a.company_code = '${pfCompCode}'
                              And a.company_code = b.company_code
                              And a.headType In ('ER','DD')
                              And b.earning_code = 'ER000'
                              And a.headCode = b.head_code`,
                          {type: QueryTypes.SELECT})   
    if (pfHead.length !== 0) {
      isPfSuccess = false;
      for (pf of pfHead) {
      let percent = 
        await dbConnect.query(`Select a.percentile/100 as percent
                                  From con_earn_head a, earn_deduct_contribution b
                                Where a.company_code = '${pfCompCode}'
                                  And a.company_code = b.company_code
                                  And a.headType In ('ER','DD')
                                  And b.head_code = '${pf.headCode}'
                                  And a.headCode = b.head_code`,
                                {type: QueryTypes.SELECT, plain: true})
                                .then((pfPercent) => {
                                  if (pfPercent) {
                                    return pfPercent.percent
                                  } else {
                                    return null
                                  }})
                                .catch((err)=> {
                                  salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                    desigName: i.designationName, netSalary: null, isProcess: false, message: `Percentile error for ${pf.headCode}!`});
                                  isSuccess = false;
                                })
        if (!isSuccess){
          return false;
        }                                
        let earnDeductAmount = 
            await dbConnect.query(`Select Sum(amount) as sumAmount
                                     From process_salary
                                    Where company_code = '${pfCompCode}'
                                      And salary_head = '${pf.headCode}'
                                      And employee_code = '${pfEmpCode}'
                                      And month = '${pfCurMonth}'
                                      And year = '${pfCurYear}'
                                      And source <> 'VRTRNS'`,
                                    {type: QueryTypes.SELECT, plain: true})
                                    .then((erddAmount)=> {
                                      if (erddAmount) {
                                        return erddAmount.sumAmount
                                      } else {
                                        return null
                                      }})
                                      .catch((err)=> {
                                        salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                          desigName: i.designationName, netSalary: null, isProcess: false, message: `Earn Deduction Summation error!`});
                                        isSuccess = false;
                                      })
        if (!isSuccess){
          return false;
        }
        let basicAmount =   
          await dbConnect.query(`Select Round(Sum(amount) * ${percent}) as basAmount
                                   From process_salary
                                  Where company_code = '${pfCompCode}'
                                    And salary_head = 'ER000'
                                    And employee_code = '${pfEmpCode}'
                                    And source <> 'VRTRNS'`,
                                {type: QueryTypes.SELECT, plain: true})
                                .then((amount)=> {
                                  if (amount) {
                                    return amount.basAmount
                                  } else {
                                    return null
                                  }})
                                  .catch((err)=> {
                                    salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                      desigName: i.designationName, netSalary: null, isProcess: false, message: `Basic Amount Summation error!`});
                                    isSuccess = false;
                                  })  
        if (!isSuccess){
          return false;
        } 
        if (basicAmount && earnDeductAmount) {
          if (Number(basicAmount) < Number(earnDeductAmount)) {
            let subsAmount = (Number(earnDeductAmount)-Number(basicAmount));
            await processSalaryModel.update({
                                    amount: Sequelize.literal(`amount - ${subsAmount}`),
                                    }, {
                                    where: {
                                      company_code: pfCompCode,
                                      employee_code: pfEmpCode,
                                      salary_head: pf.headCode,
                                      source: 'FXTRNS'
                                    }
                                  })
                                  .catch((err)=> {
                                    salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                      desigName: i.designationName, netSalary: null, isProcess: false, message: `PF update error!`});
                                    isSuccess = false;
                                  })
            if (isSuccess) {
              isPfSuccess = true;  
            }
          }
        }

        if (!isSuccess) {
          return false;
        }; 
          
        if (isPfSuccess) {
          let earnAmount = 
            await dbConnect.query(`SELECT SUM(IFNULL(amount,0)) as earnSum
                                    FROM process_salary
                                    WHERE company_code = '${pfCompCode}'
                                      AND employee_code = '${pfEmpCode}'
                                      AND month = '${pfCurMonth}'
                                      AND year = '${pfCurYear}'
                                      AND SUBSTR(salary_head,1,2) IN ('ER','OT')
                                      AND salary_head NOT IN ('ER990','ER998','ER988')
                                      AND IFNULL(ntrips,0) != 888
                                      AND IFNULL(process_flag,'N') != 'P'`,
                                  {type: QueryTypes.SELECT, plain: true})
                                  .then((sum)=> {
                                    if (sum) {
                                      return sum.earnSum
                                    } else {
                                      return 0}})
                                  .catch(err => {
                                    salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                      desigName: i.designationName, netSalary: null, isProcess: false, message: `PF earning summation error!`});
                                    isSuccess = false;
                                  }) 
          if (!isSuccess){
            return false;
          }                                  
          earnAmount = Number.parseFloat(earnAmount).toFixed(2);
          await processSalaryModel.update({
                              amount: earnAmount,
                              }, {
                              where: {
                                company_code: pfCompCode,
                                employee_code: pfEmpCode,
                                salary_head: 'ER990'
                              }
                            })
                            .catch((err)=> {
                              salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                desigName: i.designationName, netSalary: null, isProcess: false, message: `Earning Summation (pf) update error!`});
                              isSuccess = false;
                            })
          if (!isSuccess){
            return false;
          }                            
          let deductAmount = 
          await dbConnect.query(`SELECT SUM(IFNULL(amount,0)) as deductSum
                                  FROM process_salary
                                  WHERE company_code = '${pfCompCode}'
                                    AND employee_code = '${pfEmpCode}'
                                    AND month = '${pfCurMonth}'
                                    AND year = '${pfCurYear}'
                                    AND SUBSTR(salary_head,1,2) = 'DD'
                                    AND salary_head NOT IN ('DD990','DD998','DD988')
                                    AND IFNULL(ntrips,0) != 888
                                    AND IFNULL(process_flag,'N') != 'P'`,
                                {type: QueryTypes.SELECT, plain: true})
                                .then((sum)=> {
                                  if (sum) {
                                    return sum.deductSum
                                  } else {
                                    return 0}})
                                .catch(err => {
                                  salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                    desigName: i.designationName, netSalary: null, isProcess: false, message: `PF earning summation error!`});
                                  isSuccess = false;
                                }) 
          if (!isSuccess){
            return false;
          }
          deductAmount = Number.parseFloat(deductAmount).toFixed(2);
          await processSalaryModel.update({
                            amount: deductAmount,
                            }, {
                            where: {
                              company_code: pfCompCode,
                              employee_code: pfEmpCode,
                              salary_head: 'DD990'
                            }
                          })
                          .catch((err)=> {
                            salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                              desigName: i.designationName, netSalary: null, isProcess: false, message: `Deduction Summation (pf) update error!`});
                            isSuccess = false;
                          })                           

            if (!isSuccess){
              return false;
            }
            await processSalaryModel.update({
                              amount: (Number(earnAmount)-Number(deductAmount)),
                              }, {
                              where: {
                                company_code: pfCompCode,
                                employee_code: pfEmpCode,
                                salary_head: 'ER999'
                              }
                            })
                            .catch((err)=> {
                              salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                desigName: i.designationName, netSalary: null, isProcess: false, message: `Net salary summation (pf) update error!`});
                              isSuccess = false;
                            }) 
            if (!isSuccess){
              return false;
            }                          
        }
      }                                          
    }
  };

  async function grossCalculation (
                 grCompCode, grEmpCode,
                 grCategory, grBankCode,
                 grCurMonth, grCurYear,
                 grStartDate , grEndDate,
                 grPayCycle, grProcessFlag,
                 grPayMode, grTotalDays, 
                 grBranch) {
  
  let earnAmount = 
      await dbConnect.query(`SELECT SUM(IFNULL(amount,0)) as earnSum
                               FROM process_salary
                              WHERE company_code = '${grCompCode}'
                                AND employee_code = '${grEmpCode}'
                                AND month = '${grCurMonth}'
                                AND year = '${grCurYear}'
                                AND SUBSTR(salary_head,1,2) IN ('ER','OT')
                                AND salary_head NOT IN ('ER990','ER998','ER988')
                                AND IFNULL(ntrips,0) != 888
                                AND IFNULL(process_flag,'N') != 'P'`,
                             {type: QueryTypes.SELECT, plain: true})
                             .then((sum)=> {
                               if (sum) {
                                 return sum.earnSum
                               } else {
                                 return 0}})
                             .catch(err => {
                              salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                desigName: i.designationName, netSalary: null, isProcess: false, message: `Earning Summation error!`});
                              isSuccess = false;
                             }) 
    if (!isSuccess){
      return false;
    }                              
    earnAmount = Number.parseFloat(earnAmount).toFixed(2);

    let deductAmount = 
      await dbConnect.query(`SELECT SUM(IFNULL(amount,0)) as deductSum
                                FROM process_salary
                              WHERE company_code = '${grCompCode}'
                                AND employee_code = '${grEmpCode}'
                                AND month = '${grCurMonth}'
                                AND year = '${grCurYear}'
                                AND SUBSTR(salary_head,1,2) = ('DD')
                                AND IFNULL(ntrips,0) != 888
                                AND IFNULL(process_flag,'N') != 'P'`,
                              {type: QueryTypes.SELECT, plain: true})
                              .then((sum)=> {
                                if (sum) {
                                  return sum.deductSum
                                } else {
                                  return 0}})
                              .catch(err => {
                                salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                  desigName: i.designationName, netSalary: null, isProcess: false, message: `Deduction Summation error!`});
                                isSuccess = false;
                                })  
    if (!isSuccess){
      return false;
    } 
    deductAmount = Number.parseFloat(deductAmount).toFixed(2);

    if (Number(earnAmount) < Number(deductAmount)) {
      salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
        desigName: i.designationName, netSalary: null, isProcess: false, message: `Deduction amount is greater than earning amount!`});
      isSuccess = false;
      return false;
    }

    if (Number(earnAmount) > 0) {
    await insertIntoSalaryTable(grCompCode, grEmpCode, 
                                grCategory, grPayMode,
                                grBankCode, grCurMonth,
                                grCurYear, 'ER990',
                                grStartDate, grEndDate, 
                                grPayCycle, grBranch,
                                null, earnAmount,
                                null, 'PAYIMG',
                                currentUser, processFlag,
                                null, null); 
    }                                 
                                 
   if (Number(deductAmount) > 0) {
   await insertIntoSalaryTable(grCompCode, grEmpCode, 
                               grCategory, grPayMode,
                               grBankCode, grCurMonth,
                               grCurYear, 'DD990',
                               grStartDate, grEndDate, 
                               grPayCycle, grBranch,
                               null, deductAmount,
                               null, 'PAYIMG',
                               currentUser, processFlag,
                               null, null);                                                                          
   }

   empNetSalary = Math.floor(earnAmount-deductAmount);
   //let tempAmount = (earnAmount-deductAmount % 1);
   if (Number(empNetSalary) > 0) { 
   await insertIntoSalaryTable(grCompCode, grEmpCode, 
                               grCategory, grPayMode,
                               grBankCode, grCurMonth,
                               grCurYear, 'ER999',
                               grStartDate, grEndDate, 
                               grPayCycle, grBranch,
                               null, empNetSalary,
                               null, 'PAYIMG',
                               currentUser, processFlag,
                               null, null);     
   }                                         
  }; 

  async function variableTransactions (
                varCompCode, varEmpCode,
                varCategory, varPayMode,
                varBankCode, varCurMonth,
                varCurYear, varStartDate,
                varEndDate, varPayCycle,
                varProcessFlag) {

  let varData = await variableTransactionModle.findAll({
                      attributes:['id','branch','transaction_code','salary_head', ['days','working_hour'],'amount'],
                      where: {
                        company_code: varCompCode,
                        employee_code: varEmpCode,
                        process_month: varCurMonth,
                        process_year: varCurYear,
                        process_flag: 'N'
                      }
                    }).catch((err)=> {
                      salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                        desigName: i.designationName, netSalary: null, isProcess: false, message: `Variable transaction error!`});
                      isSuccess = false;
                    })
    if (!isSuccess) {
      return false;
    }
    if (varData.length !== 0) {
      for (vard of varData) {
        
        await insertIntoSalaryTable(varCompCode, varEmpCode,
                                    varCategory, varPayMode,
                                    varBankCode,varCurMonth,
                                    varCurYear, vard.salary_head, 
                                    varStartDate, varEndDate,
                                    varPayCycle, i.branch,
                                    vard.transaction_code, 
                                    vard.amount, vard.working_hour, 
                                    'VRTRNS', currentUser,
                                    varProcessFlag,null,
                                    null);
       // countForNet = 0;
        if (varProcessFlag === 'Y') {
          await variableTransactionModle.update(
            {process_flag: 'Y'},
            {where: {
              id: vard.id
             }
            })
        }
      }
    }                                      
  };

  async function salaryNonAttendance(
                  nonAtCompCode, nonAtEmpCode,
                  nonAtCategory, nonAtPayMode,
                  nonAtBankCode, nonAtCurMonth,
                  nonAtCurYear, nonAtStartDate,
                  nonAtEndDate, nonAtWorkingHours,
                  nonAtBasicPay, nonAtprocessFlag,
                  nonAtBranch, nonAtPayCycle,
                  nonAtTotDays) {
  let curAmount = 0;
  let salAmount = 0;

  let salNonAttend = 
     await dbConnect.query(`SELECT a.salary_head,a.amount,a.dependsOnAttendance,b.paymentFrequency
                        FROM cor_emp_current_salary a, con_earn_head b
                        WHERE NOT EXISTS (SELECT 'X' FROM  con_tax_master d, con_code_master e, con_paycycle f
                                            WHERE d.company_code = a.company_code
                                              AND d.tax_head_code = a.salary_head
                                              AND f.company_code = d.company_code
                                              AND e.company_code = e.company_code
                                              AND f.paycycleNum = '${nonAtPayCycle}'
                                              AND f.currentMonth = '${nonAtCurMonth}'
                                              AND f.currentYear = '${nonAtCurYear}'
                                              AND f.category = '${nonAtCategory}'
                                              AND f.attendanceFrom BETWEEN d.effective_date AND d.expire_date
                                              AND f.attendanceTo BETWEEN d.effective_date AND d.expire_date
                                              AND e.hard_code = 'TX'
                                              AND e.code = d.tax_class
                                              AND f.category = e.header)
                                AND a.company_code = '${nonAtCompCode}'
                                AND a.employee_code = '${nonAtEmpCode}'
                                AND a.company_code = b.company_code
                                AND IFNULL(a.dependsOnAttendance,'Y')='N'
                                AND a.salary_head = b.headCode
                                AND a.salary_head <> 'DD011'
                                AND b.paymentFrequency IN ('D','H','M')
                                ORDER BY salary_head`, {type: QueryTypes.SELECT})
                                .catch((err)=> {
                                  salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                    desigName: i.designationName, netSalary: null, isProcess: false, message: 'Error in non attendance salary process!'});
                                  isSuccess = false;})
  if (!isSuccess) {
    return false;
  }                                 
  if (salNonAttend.length !== 0) {
    for (salNon of salNonAttend) {
    let countDisAct = 
          await dbConnect.query(`SELECT COUNT(*) as count           
                                   FROM disciplinary_action
                                  WHERE company_code = '${nonAtCompCode}'
                                    AND employee_code = '${nonAtEmpCode}'
                                    AND effective_date <= DATE("${nonAtStartDate}")
                                    AND IFNULL(expire_date,DATE("${nonAtEndDate}")) >= DATE("${nonAtEndDate}")`, 
                              {type: QueryTypes.SELECT, plain: true}
                              ).then((actCount)=> {
                                if (actCount) {
                                  return actCount.count;
                                } else {
                                  return 0
                                }
                              });
         if (countDisAct > 0){
          let disActSalary = 
            await dbConnect.query(`SELECT (CASE WHEN IFNULL(payment_flag,'N') = 'Y' THEN IFNULL(new_amount,0) ELSE 0 END) amount
                                    FROM disciplinary_action_salary
                                  WHERE company_code = '${nonAtCompCode}'
                                    AND salary_head = '${salNon.salary_head}'
                                    AND (effective_date,employee_code,document_type,document_number) IN (
                                            SELECT effective_date,employee_code,document_type,document_number
                                              FROM disciplinary_action
                                            WHERE company_code = '${nonAtCompCode}'
                                              AND employee_code = '${nonAtEmpCode}'
                                              AND effective_date <= DATE("${nonAtStartDate}")
                                              AND IFNULL(expire_date,DATE("${nonAtEndDate}")) >= DATE("${nonAtEndDate}"))`, 
                                   {type: QueryTypes.SELECT})
            if (disActSalary.length === 0){
              curAmount = 0;
            } else {
              curAmount = disActSalary[0]['amount'];
            }                                  
        } else {
          curAmount = salNon.amount;
        } 

        let diffTime = Math.abs(new Date(nonAtEndDate) - new Date(nonAtStartDate));
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+1; ; 

        if (salNon.paymentFrequency == 'M') {
          salAmount = curAmount * diffDays/nonAtTotDays;
        } else if (salNon.paymentFrequency == 'D') {
          salAmount = curAmount * diffDays;
        } else if (salNon.paymentFrequency == 'H') {
          salAmount = curAmount * diffDays * nonAtWorkingHours;
        } 
        salAmount = Number.parseFloat(salAmount).toFixed(2);

        if (Number(salAmount) > 0) {
          await insertIntoSalaryTable(nonAtCompCode , nonAtEmpCode,
                                      nonAtCategory , nonAtPayMode,
                                      nonAtBankCode , nonAtCurMonth,
                                      nonAtCurYear , salNon.salary_head,
                                      nonAtStartDate , nonAtEndDate,
                                      nonAtPayCycle , nonAtBranch,
                                      null, salAmount,
                                      diffDays, 'FXTRNS',
                                      currentUser , nonAtprocessFlag,
                                      null, salNon.salary_head);  
         // countForNet = 0; 
        }                                                                          
    }
   }                                                                     
  };

  async function attnCalculateFn(attCompCode, attEmpCode,
                                attCategory, attPayMode,
                                attBankCode, attCurMonth,
                                attCurYear, attStartDate,
                                attEndDate, attWorkingHour,
                                attOldBasic, attTotDays,
                                attGrFlag, attProcessFlag,
                                attBranch, attPayCycle,
                                attAttendanceType, attTotalHours,
                                attAttendanceCode, attAttendanceCategory) {
  let days = 0;
  let contAmount = 0;  
  let curAmount = 0;
                                       
  let erincl = 
      await dbConnect.query(`SELECT header erincl , 100 nhours
                              FROM con_code_master
                              WHERE company_code = '${attCompCode}'
                                AND code = '${attAttendanceType}'`,
                            {type: QueryTypes.SELECT})  // Hard Coded nhours - need to edit in future
  if (erincl.length === 0) {
    await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
      desigName: i.designationName, netSalary: null, isProcess: false, message: `Other Error from Code Master Read routine 2`});
      isAttendance = false;
      return false;
  } else {
    let inclCode = erincl[0]['erincl'];
    let empCurrentSalary = 
          await dbConnect.query( `SELECT a.salary_head,  a.amount amount, a.dependsOnAttendance, b.paymentFrequency
                                    FROM cor_emp_current_salary a, con_earn_head b
                                   WHERE a.company_code= '${attCompCode}'
                                     AND b.company_code = a.company_code
                                     AND a.employee_code= '${attEmpCode}'
                                     AND IFNULL(a.dependsOnAttendance ,'Y')='Y'
                                     AND b.headCode = a.salary_head
                                     AND b.paymentFrequency IN ('D','H','M')
                                     AND '${inclCode}' = 'A'
                                  UNION ALL
                                  SELECT a.salary_head,  a.amount amount, a.dependsOnAttendance, b.paymentFrequency
                                    FROM cor_emp_current_salary a, con_earn_head b, earn_deduct_contribution c
                                   WHERE a.company_code = '${attCompCode}'
                                     AND a.company_code = b.company_code
                                     AND a.company_code = c.company_code
                                     AND a.employee_code = '${attEmpCode}'
                                     AND IFNULL(a.dependsOnAttendance,'Y')='Y'
                                     AND b.headCode = a.salary_head
                                     AND b.paymentFrequency IN ('D','H','M')
                                     AND c.head_code =  '${attAttendanceType}'
                                     AND a.salary_head = c.earning_code
                                     AND '${inclCode}' = 'D'`, {type: QueryTypes.SELECT})       
    
      if (empCurrentSalary) {
      for (curSalary of empCurrentSalary){
        let countDisAct = 
            await dbConnect.query(`SELECT COUNT(*) as count           
                                     FROM disciplinary_action
                                    WHERE company_code = '${attCompCode}'
                                      AND employee_code = '${attEmpCode}'
                                      AND effective_date <= DATE("${attStartDate}")
                                      AND IFNULL(expire_date,DATE("${attEndDate}")) >= DATE("${attEndDate}")`, 
                                  {type: QueryTypes.SELECT, plain: true}
                                 ).then((actCount)=> {
                                   if (actCount) {
                                     return actCount.count;
                                   } else {
                                     return 0
                                   }
                                 });
        if (countDisAct > 0){
          let disActSalary = 
            await dbConnect.query(`SELECT (CASE WHEN IFNULL(payment_flag,'N') = 'Y' THEN IFNULL(new_amount,0) ELSE 0 END) amount
                                    FROM disciplinary_action_salary
                                  WHERE company_code = '${attCompCode}'
                                    AND salary_head = '${curSalary.salary_head}'
                                    AND (effective_date,employee_code,document_type,document_number) IN (
                                            SELECT effective_date,employee_code,document_type,document_number
                                              FROM disciplinary_action
                                            WHERE company_code = '${attCompCode}'
                                              AND employee_code = '${attEmpCode}'
                                              AND effective_date <= DATE("${attStartDate}")
                                              AND IFNULL(expire_date,DATE("${attEndDate}")) >= DATE("${attEndDate}"))`, 
                                   {type: QueryTypes.SELECT})
          if (disActSalary.length === 0){
            curAmount = 0;
          } else {
            curAmount = disActSalary[0]['amount'];
          }                                  
        } else {
          curAmount = curSalary.amount;
        }
        
        if(curSalary.dependsOnAttendance === 'Y') {
          days = attTotalHours/attWorkingHour ;
          if (curSalary.paymentFrequency == 'M') {
            contAmount = (curAmount * attTotalHours)/(attTotDays*attWorkingHour);
          } else if (curSalary.paymentFrequency == 'D') {
            contAmount = (curAmount * attTotalHours)/(attWorkingHour);
          } else if (curSalary.paymentFrequency == 'H') {
            contAmount = (curAmount * attTotalHours);
          } 
        } else {
          days = attTotDays;
          if (curSalary.paymentFrequency == 'M') {
            contAmount = curAmountt ;
          } else if (curSalary.paymentFrequency == 'D') {
            contAmount = curAmount * attTotDays;
          } else if (cont.paymentFrequency == 'H') {
            contAmount = (curAmount * attTotDays * attWorkingHour);
          }
        }
        let nhours = erincl[0]['nhours'];
        let nhoursCount = nhours?nhours:100;
        contAmount = Number.parseFloat(nhoursCount/100*contAmount).toFixed(2);

        if ( Number(contAmount) > 0) {
          await insertIntoSalaryTable(attCompCode , attEmpCode,
                                      attCategory , attPayMode,
                                      attBankCode , attCurMonth,
                                      attCurYear , curSalary.salary_head,
                                      attStartDate, attEndDate,
                                      attPayCycle , attBranch,
                                      attAttendanceCategory, contAmount,
                                      days, 'FXTRNS',
                                      currentUser , attProcessFlag,
                                      null, attAttendanceType);
         //countForNet = 0;
        }
  
      }
     }
    }                             
  };

  async function attnPromCalculateFn(attCompCode, attEmpCode,
                                     attCategory, attPayMode,
                                     attBankCode, attCurMonth,
                                     attCurYear,  attStartDate,
                                     attEndDate,  attWorkingHour,
                                     attOldBasic, attTotDays,
                                     attGrFlag,   attProcessFlag,
                                     attBranch,   attPayCycle,
                                     attAttendanceType, attTotalHours,
                                     attAttendanceCode, attAttendanceCategory,
                                     amountOldOrNew) {
  let days = 0;
  let contAmount = 0;                                       
  let erincl = 
     await dbConnect.query(`SELECT header erincl , 100 nhours
                              FROM con_code_master
                             WHERE company_code = '${attCompCode}'
                               AND code = '${attAttendanceType}'`,
                            {type: QueryTypes.SELECT})  // Hard Coded nhours - need to edit in future
  if (erincl.length === 0) {
    await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
      desigName: i.designationName, netSalary: null, isProcess: false, message: `Other Error from Code Master Read routine`});
     isAttendance = false;
     return false;
  } else {
    let inclCode = erincl[0]['erincl'];
    let empContribute = 
          await dbConnect.query( `SELECT  a.earn_deduct_code, 
                                          (CASE WHEN '${amountOldOrNew}' = 'OLD' THEN a.old_amount WHEN '${amountOldOrNew}' = 'NEW' THEN a.new_amount ELSE null END) amount,
                                          a.dependsOnAttendance,b.paymentFrequency
                                     FROM employee_growth_details a, con_earn_head b
                                    WHERE a.company_code= '${attCompCode}'
                                      AND b.company_code = a.company_code
                                      AND a.employee_code= '${attEmpCode}'
                                      AND a.effective_date= (CASE WHEN '${amountOldOrNew}' = 'OLD' THEN DATE("${attEndDate}")+1 WHEN '${amountOldOrNew}' = 'NEW' THEN DATE("${attStartDate}") ELSE null END)
                                      AND IFNULL(a.dependsOnAttendance ,'Y')='Y'
                                      AND b.headCode = a.earn_deduct_code
                                      AND b.paymentFrequency IN ('D','H','M')
                                      AND '${inclCode}' = 'A'
                                  UNION
                                  SELECT  a.earn_deduct_code,
                                          (CASE WHEN '${amountOldOrNew}' = 'OLD' THEN a.old_amount WHEN '${amountOldOrNew}' = 'NEW' THEN a.new_amount ELSE null END) amount,
                                          a.dependsOnAttendance,b.paymentFrequency
                                     FROM employee_growth_details a, con_earn_head b, earn_deduct_contribution c
                                    WHERE a.company_code = '${attCompCode}'
                                      AND a.company_code = b.company_code
                                      AND a.company_code = c.company_code
                                      AND a.employee_code = '${attEmpCode}'
                                      AND a.effective_date= (CASE WHEN '${amountOldOrNew}' = 'OLD' THEN DATE("${attEndDate}")+1 WHEN '${amountOldOrNew}' = 'NEW' THEN DATE("${attStartDate}") ELSE null END)
                                      AND IFNULL(a.dependsOnAttendance,'Y')='Y'
                                      AND b.headCode = a.earn_deduct_code
                                      AND b.paymentFrequency IN ('D','H','M')
                                      AND c.head_code = '${attAttendanceType}'
                                      AND a.earn_deduct_code = c.earning_code
                                      AND '${inclCode}' = 'D'`, {type: QueryTypes.SELECT})
     
    if (empContribute){
      for(cont of empContribute) {
        if(cont.dependsOnAttendance === 'Y') {
          days = attTotalHours/attWorkingHour ;
          if (cont.paymentFrequency == 'M') {
            contAmount = (cont.amount * attTotalHours)/(attTotDays*attWorkingHour);
          } else if (cont.paymentFrequency == 'D') {
            contAmount = (cont.amount * attTotalHours)/(attWorkingHour);
          } else if (cont.paymentFrequency == 'H') {
            contAmount = (cont.amount * attTotalHours);
          } 
        } else {
          days = attTotDays;
          if (cont.paymentFrequency == 'M') {
            contAmount = cont.amount ;
          } else if (cont.paymentFrequency == 'D') {
            contAmount = cont.amount * attTotDays;
          } else if (cont.paymentFrequency == 'H') {
            contAmount = (cont.amount * attTotDays * attWorkingHour);
          }
        }
        let nhours = erincl[0]['nhours'];
        let nhoursCount = nhours?nhours:100;
        contAmount = Number.parseFloat(nhoursCount/100*contAmount).toFixed(2);
        
        if (Number(contAmount) > 0) {
          await insertIntoSalaryTable(attCompCode , attEmpCode,
                                      attCategory , attPayMode,
                                      attBankCode , attCurMonth,
                                      attCurYear , cont.earn_deduct_code,
                                      attStartDate , attEndDate,
                                      attPayCycle , attBranch,
                                      attAttendanceCategory, contAmount,
                                      days, 'GRWDTL',
                                      currentUser , attProcessFlag,
                                      null, attAttendanceType);
          //countForNet = 0;
        }
     }
    }                         
  }  
  };
  
  async function promNonAttendanceFn(promCompCode, promEmpCode , 
                                     promCategory, promPayMode, 
                                     promBankCode, promCurMonth,
                                     promCurYear,  promStartDate, 
                                     promEndDate,  promWorkingHour, 
                                     promOldBasic, promProcessFlag,
                                     promBranchCode, promPaycycle, 
                                     promTotalDays) {                                      
    let growDetailByProm = 
       await dbConnect.query(`SELECT a.earn_deduct_code as earnCode, a.old_amount as amount,a.dependsOnAttendance as ratedFlag, b.paymentFrequency
                    FROM employee_growth_details a, con_earn_head b
                   WHERE a.company_code = '${promCompCode}'
                     AND a.employee_code = '${promEmpCode}'
                     AND a.effective_date = DATE("${promEndDate}")+1 
                     AND IFNULL(a.dependsOnAttendance,'Y')='N'
                     AND a.earn_deduct_code = b.headCode
                     AND b.paymentFrequency IN ('D','H','M')
                   ORDER BY b.headCode`, {type: QueryTypes.SELECT})
   
    let sDate = new Date(promStartDate);
    let eDate = new Date(promEndDate);
    let diffTime = Math.abs(eDate - sDate);
    let countdays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))+2; 
  
    for (gdetail of growDetailByProm) {
      var detailAmount = 0;
      if (gdetail.earnCode !== 'DD011') {
        if (gdetail.paymentFrequency == 'M') {
          let x = gdetail.amount * countdays/promTotalDays;
          detailAmount = Number.parseFloat(x).toFixed(2); //Round(number,2)
      } else if (gdetail.paymentFrequency == 'D') {
          let y = gdetail.amount * countdays;
          detailAmount = Number.parseFloat(y).toFixed(2);
      } else if (gdetail.paymentFrequency == 'H') {
          let z = gdetail.amount * countdays * promWorkingHour;
          detailAmount = Number.parseFloat(z).toFixed(2);
      }
     
      if (Number(detailAmount) > 0) {
        await insertIntoSalaryTable(
              promCompCode, promEmpCode, 
              promCategory, promPayMode,
              promBankCode, promCurMonth,
              promCurYear, gdetail.earnCode,
              promStartDate, promEndDate, 
              promPaycycle, promBranchCode,
              null, detailAmount,
              promWorkingHour, 'GRWDTL',
              currentUser, promProcessFlag,
              null, null);
        //countForNet = 0;
      }
     }
    }
  };

  async function fetchingAttendance( fetchCompCode, fetchEmpCode ,
                                     fetchCategory, fetchPayMode,
                                     fetchBankCode, fetchCurMonth ,
                                     fetchCurYear,  fetchStartDate,
                                     fetchEndDate , fetchWorkingHour,
                                     fetchOldBasic, fetchTotDays,
                                     fetchGrFlag, fetchProcessFlag,
                                     fetchBranch, fetchPayCycle,
                                     fetchUser) {
    let attendanceHours = 
             await  dbConnect.query(`SELECT attendance_date, count(*) as att_count
                                 FROM emp_daily_attendance a, con_code_master b
                                WHERE a.company_code = '${fetchCompCode}'
                                  AND a.company_code = b.company_code
                                  AND a.employee_code = '${fetchEmpCode}'
                                  AND attendance_date BETWEEN DATE("${fetchStartDate}") AND DATE("${fetchEndDate}")
                                  AND IFNULL(a.process_flag,'N')='N'
                                  AND a.attendance_type = CONCAT(b.hard_code,b.soft_code)
                                  AND (SUBSTR(a.attendance_type,1,2)='AT' OR (SUBSTR(a.attendance_type,1,2)='LV' AND IFNULL(b.header,'N')!='N'))
                                GROUP BY attendance_date
                               HAVING SUM(attendance_hours) >= ${fetchWorkingHour}
                                  ORDER BY 1`, {type: QueryTypes.SELECT})   
    
    // ****************** use later for Hours calculation in a Day ******************   
    //********************* DO NOT DELETE ************ DO NOT DELETE *********** DO NOT DELETE ******************* 
    //********************* DO NOT DELETE ************ DO NOT DELETE *********** DO NOT DELETE *******************                                
    //********************* DO NOT DELETE ************ DO NOT DELETE *********** DO NOT DELETE *******************                                
    // if (attendanceHours.length !== 0 ) {
    //   let attCount = attendanceHours[0]['att_count'];
    //   let attDate = attendanceHours[0]['attendance_date'];
    //   if (Number(attCount) > 0) {
    //     await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
    //       desigName: i.designationName, netSalary: null, isProcess: false, message: `Hours exceeds normal working hours in a day ${attDate}`});
    //     isAttendance = false;
    //     isFetchStatus = false;
    //     return false;
    //   } 
    // } else if (attendanceHours.length > 1) {
    //   await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
    //     desigName: i.designationName, netSalary: null, isProcess: false, message: `Hours exceeds normal working hours in a day ${attDate}`});
    //   isAttendance = false;
    //   isFetchStatus = false;
    //   return false;
    // }
    // ****************** use later for Hours calculation in a Day ******************     
    // ********************* DO NOT DELETE ************ DO NOT DELETE *********** DO NOT DELETE *******************   
    // ********************* DO NOT DELETE ************ DO NOT DELETE *********** DO NOT DELETE *******************                            
    // ********************* DO NOT DELETE ************ DO NOT DELETE *********** DO NOT DELETE *******************  
    
    let attendanceCalculate = 
        await dbConnect.query(`SELECT a.attendance_type , a.attendance_code , a.attendance_category ,SUM(a.attendance_hours) tothrs,
                                      SUM(IFNULL(a.attendance_hours,0)/${fetchWorkingHour}) days, SUBSTR(a.attendance_type,1,2) att_short_type
                                FROM emp_daily_attendance a, con_code_master b
                                WHERE a.company_code = '${fetchCompCode}'
                                  AND a.company_code = b.company_code
                                  AND a.employee_code = '${fetchEmpCode}'
                                  AND a.attendance_date BETWEEN DATE("${fetchStartDate}") AND DATE("${fetchEndDate}")
                                  AND IFNULL(a.process_flag ,'N')='N'
                                  AND b.hard_code = SUBSTR(a.attendance_type,1,2)
                                  AND b.soft_code = SUBSTR(a.attendance_type,3)
                                  AND (SUBSTR(a.attendance_type,1,2) IN ('AT','OT')
                                  OR (SUBSTR(a.attendance_type,1,2)='LV' AND IFNULL(b.header,'N')!='N'))
                              GROUP BY  a.attendance_type, a.attendance_code, a.attendance_category, att_short_type
                              ORDER BY  a.attendance_type, a.attendance_code, a.attendance_category`, {type: QueryTypes.SELECT})

    if (attendanceCalculate.length !== 0) {
      for (attCal of attendanceCalculate) {
        if (attCal.att_short_type === 'AT' || attCal.att_short_type === 'LV') {
          if (fetchGrFlag === 'Y') {
              await attnPromCalculateFn(fetchCompCode, fetchEmpCode,
                                      fetchCategory, fetchPayMode,
                                      fetchBankCode, fetchCurMonth,
                                      fetchCurYear, fetchStartDate,
                                      fetchEndDate, fetchWorkingHour,
                                      fetchOldBasic, fetchTotDays,
                                      fetchGrFlag, fetchProcessFlag,
                                      fetchBranch, fetchPayCycle,
                                      attCal.attendance_type, attCal.tothrs,
                                      attCal.attendance_code, attCal.attendance_category,
                                      'OLD');
          } else {
            let processed = 
                  await dbConnect.query(`SELECT IFNULL(processed,'N') as processed
                                           FROM employee_growth
                                          WHERE company_code = '${fetchCompCode}'
                                            AND employee_code = '${fetchEmpCode}'
                                            AND document_type IN ('IN','PR','SU','DE')
                                            AND effective_date BETWEEN DATE("${fetchStartDate}") AND DATE("${fetchEndDate}")`,
                                          {type: QueryTypes.SELECT, plain: true}
                                          ).then((process)=> {
                                            if (process){
                                              return process.processed
                                            } else {
                                              return 'U'
                                            }
                                          })
            
            if (processed === 'N') { 
              await attnPromCalculateFn(fetchCompCode, fetchEmpCode,
                                        fetchCategory, fetchPayMode,
                                        fetchBankCode, fetchCurMonth,
                                        fetchCurYear, fetchStartDate,
                                        fetchEndDate, fetchWorkingHour,
                                        fetchOldBasic, fetchTotDays,
                                        fetchGrFlag, fetchProcessFlag,
                                        fetchBranch, fetchPayCycle,
                                        attCal.attendance_type, attCal.tothrs,
                                        attCal.attendance_code, attCal.attendance_category,
                                        'NEW');
            } else if(processed === 'U') {
                await attnCalculateFn(fetchCompCode, fetchEmpCode,
                                      fetchCategory, fetchPayMode,
                                      fetchBankCode, fetchCurMonth,
                                      fetchCurYear, fetchStartDate,
                                      fetchEndDate, fetchWorkingHour,
                                      fetchOldBasic, fetchTotDays,
                                      fetchGrFlag, fetchProcessFlag,
                                      fetchBranch, fetchPayCycle,
                                      attCal.attendance_type, attCal.tothrs,
                                      attCal.attendance_code, attCal.attendance_category);
            }
          }
          isAttendance = true;
          isFetchStatus = true;
        } else if(attCal.att_short_type === 'OT') {
          console.log('pending...');
          isAttendance = true;
          isFetchStatus = true;
        } 
      }
      if(fetchProcessFlag === 'Y') {
        await empDailyAttModel.update(
                {process_flag: 'Y'},
                  {where: {
                    company_code: fetchCompCode,
                    employee_code: fetchEmpCode,
                    attendance_date: {[Op.between]: [fetchStartDate, fetchEndDate]},
                    attendance_type: { [Op.or]: [{ [Op.startsWith] : 'AT' }, { [Op.startsWith]: 'LV' }]}}
                  }).catch(err=> {
                    salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                      desigName: i.designationName, netSalary: null, isProcess: false, message: `Error to update attendance flag!`});
                    isAttendance = false;
                    isFetchStatus = false;
                  })
        if (!isFetchStatus) {
          return false;
        }
        isFetchStatus = true;                        
      }
    } else if(attendanceCalculate.length === 0) {
      await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
        desigName: i.designationName, netSalary: null, isProcess: false, message: `Attendance not found!`});
      isAttendance = false;
      isFetchStatus = false;
      return false;
    }
  };

  async function update_tax(updCompanyCode, updEmpCode, updCategory, 
                            updTaxHead, updTaxAmount, updCurrentMonth,
                            updCurrentYear, updPayCycle, updProcessFlag) 
                            {
    taxHistoryModel.update(
      { tax_pay_date: new Date(),
        tax_status: 'P',  
        tax_pay_amount: updTaxAmount,
        update_by: currentUser,      
        update_date: new Date()},
        {where: {
          company_code: updCompanyCode,
          employee_code: updEmpCode,
          tax_month: updCurrentMonth,
          tax_year: updCurrentYear
        }
      })
  };

  async function taxCalculationFn(taxCompCode, taxEmpCode, taxCategory,
                                    payMode, bankCode, startDate, 
                                    endDate, taxCurMonth, taxCurYear,
                                    taxProcessFlag, branch, taxPayCycle,
                                    taxCurUser) {
      var taxStatus = 'N';                                      
      var taxProcessAmount = 0;

      let payCycleStatus = await payCycleModel.findAll({
              attributes: ['payStatus'],
              where : {
                company_code: taxCompCode,
                paycycleNum: taxPayCycle,
                monthStatus: 'N'
              },
              plain: true
            }).then((status)=> {
              if (status) {
                if (status.payStatus === 'P') {
                  return 'Y'
                } else {
                  return status.payStatus
                }
              } else {
                res.json({isExecuted: false, message: 'Pay cycle month not found. Please check!'});
                throw new Error(`Pay cycle month not found. Please check!`);
              }
            });


      let isActiveEmp = 
         await dbConnect.query(`Select doppro 
                                  From cor_employee_master a,ph_empstatus b
                                 Where a.company_code = '${taxCompCode}'
                                   And a.company_code = b.compcde
                                   And a.employee_code = '${taxEmpCode}'
                                   And a.emp_status = b.headcode`,
                                {type: QueryTypes.SELECT, plain: true})
                                .then((active)=> {
                                  if (active) {
                                    return active.doppro;
                                  } else {
                                    res.json({isExecuted: false, message: 'Employee status error!'});
                                    throw new Error('Employee status error!')
                                  }
                                }).catch((err)=> {
                                  res.json({isExecuted: false, message: 'Employee status error!'});
                                  throw new Error('Employee status error!')
                                })
      
      let taxHistory = await taxHistoryModel.findAll({
              attributes: ['tax_status','tax_pay_amount'],
              where : {
                company_code: taxCompCode,
                employee_code: taxEmpCode,
                tax_month: taxCurMonth,
                tax_year: taxCurYear,
              }
            });      

      if (taxHistory.length === 0) {
        if (payCycleStatus === 'Y') {
          isTaxCalculate = true;
        } else if (payCycleStatus === 'N') {
          let overTime = 
            await empOvertimeModel.findAll({
            where: {
              company_code: taxCompCode,
              employee_code: taxEmpCode}
          })
          if (overTime.length === 0) {
            await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
              desigName: i.designationName, netSalary: null, isProcess: false, message: 'Tax amount not found'});
            isTaxCalculate = false;
            return false;
          }
        } else if (isActiveEmp === 'N') {
          isTaxCalculate = true;
        } else if (payCycleStatus !== 'Y') {
          await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
            desigName: i.designationName, netSalary: null, isProcess: false, message: `Tax Calculation Has Not Been Processed`});
          isTaxCalculate = false;
          return false;
        }
      } else {
        taxStatus = taxHistory[0]['tax_status'];
        taxProcessAmount = taxHistory[0]['tax_pay_amount'];
      }

      if (payCycleStatus === 'Y' && taxProcessFlag === 'Y') {
        taxStatus = 'Y';
      } else if (payCycleStatus === 'Y' && taxProcessFlag === 'N') {
        taxStatus = 'N';
      }

      if (taxStatus === 'N' && taxProcessFlag === 'Y') {
        await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
          desigName: i.designationName, netSalary: null, isProcess: false, message: 'Tax Calculation Has Not Been Finally Processed.'});
        isTaxCalculate = false;
        return false;
      } else if ((taxStatus === 'Y' && taxProcessFlag === 'Y') || (taxStatus === 'N' && taxProcessFlag === 'N')) {
        let taxHead;
        let taxBranch;
        let taxWorkingHour;
        let taxCal1 = 
            await dbConnect.query(
                `SELECT d.tax_head_code, b.branch, a.workingHours
                FROM con_paycycle a, cor_employee_master b,
                     con_tax_master d, con_code_master e
                   WHERE a.company_code = '200'
                   AND a.paycycleNum = ${taxPayCycle}
                     AND a.currentMonth = ${taxCurMonth}
                     AND a.currentYear = ${taxCurYear}
                      AND a.category = '${taxCategory}'
                     AND a.company_code = b.company_code
                     AND b.employee_code = '${taxEmpCode}'
                     AND a.paycycleNum = b.pay_cycle
                     AND a.category = b.category
                     AND b.company_code = d.company_code
                     AND a.attendanceFrom >= d.effective_date
                     AND a.attendanceTo >= d.effective_date
                     AND d.status = 'A'
                     AND e.company_code = a.company_code
                     AND e.hard_code = 'TX'
                     AND e.code = d.tax_class
                     AND e.header = a.category`, {type: QueryTypes.SELECT}
                 )

        if (taxCal1.length === 0) {
          await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
            desigName: i.designationName, netSalary: null, isProcess: false, message: 'Tax Master Set Up is not Found For This Period'});
          isTaxCalculate = false;
          return false;
        } else {
          taxHead = taxCal1[0]['tax_head_code'];
          taxBranch = taxCal1[0]['branch'];
          taxWorkingHour = taxCal1[0]['workingHours'];

          let getCurrentTaxAmount = 
              await empCurrentSalary.findAll({
                      attributes: ['amount'],
                      where: {
                        company_code: taxCompCode,
                        employee_code: taxEmpCode,
                        salary_head: taxHead
                      }, plain: true
                     }).then((amount)=> {
                      if (amount) {
                        return amount.amount;
                      } else {
                        if (Number(taxProcessAmount) === 0) {
                          isTaxCalculate = true;
                          if (isTaxCalculate && taxProcessFlag === 'Y') {
                            try {
                            update_tax(taxCompCode, taxEmpCode, category, 
                                       taxHead, getCurrentTaxAmount, taxCurMonth,
                                       taxCurYear, paycycleNum, taxProcessFlag);
                            } catch {
                              salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                desigName: i.designationName, netSalary: null, isProcess: false, message: 'Tax table update error'});
                              isTaxCalculate = false;
                              return false;
                            }
                          } else {
                            return 0;
                          }
                        } else if (Number(taxProcessAmount) !== 0 && payCycleStatus !== 'Y') {
                             salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                                    desigName: i.designationName, netSalary: null, isProcess: false, message: 'No Tax Amount is Found on Salary Table'});
                            isTaxCalculate = false;
                            return false;
                        }
                      }
                     });

          if (getCurrentTaxAmount == 'undefined') {
            getCurrentTaxAmount = 0;
          }                    
          if ((Number(getCurrentTaxAmount) !== Number(taxProcessAmount)) && isTaxCalculate) {
            await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
              desigName: i.designationName, netSalary: null, isProcess: false, message: 'Tax Amount is Not Same as Salary Table Amount'});
            isTaxCalculate = false;
            return false;
          } else if (Number(getCurrentTaxAmount) === Number(taxProcessAmount) && Number(taxProcessAmount) !== 0 && isTaxCalculate) {
              await processSalaryModel.destroy({
                where: {
                  company_code: taxCompCode,
                  employee_code: taxEmpCode,
                  month: taxCurMonth,
                  year: taxCurYear, 
                  salary_head: taxHead,
                  process_flag: 'N'
                }
              }).catch((err)=>{
                res.json({ isExecuted: false, message: `Error deleting tax head amount!!!`});
                throw new Error(`Error deleting tax head amount!!!`);
              });

              if (Number(getCurrentTaxAmount) > 0 ) {
                await insertIntoSalaryTable(
                          taxCompCode, taxEmpCode, 
                          taxCategory, 'M',
                          null, taxCurMonth,
                          taxCurYear, taxHead,
                          attendanceFrom, attendanceTo, 
                          paycycleNum, taxBranch,
                          null, getCurrentTaxAmount,
                          taxWorkingHour, 'TAXPRC',
                          taxCurUser, taxProcessFlag,
                          null, null); 

                //countForNet = 0;
                isTaxCalculate = true;
              }
              if (isTaxCalculate && taxProcessFlag === 'Y') {
                try {
                await update_tax(taxCompCode, taxEmpCode, category, 
                  taxHead, getCurrentTaxAmount, taxCurMonth,
                  taxCurYear, paycycleNum, taxProcessFlag);
                } catch {
                  await salSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                    desigName: i.designationName, netSalary: null, isProcess: false, message: 'Tax table update error'});
                  isTaxCalculate = false;
                  return false;
                }
              }
          }
        }
      }
    }; 

  async function insertIntoSalaryTable(companyCode, employeeCode, 
                                      categoryCode, payMode,
                                      bankCode, currentMonth,
                                      currentYear, earnDeductCode,
                                      startDate, endDate, 
                                      payCycle, salBranchCode,
                                      trnCode, amount,
                                      workDays, source,
                                      currentUser, processFlag,
                                      reference, attendType) {
  let deductAmount = 0;
  let dependOnAttendFlag = 
            await dbConnect.query(
            `Select dependsOnAttendance
            From con_earn_head
            Where company_code = '${companyCode}'
            And headType in ('ER','DD')
            And headCode = '${earnDeductCode}'`,
            {type: QueryTypes.SELECT, plain: true}
            ).then((result) => {
              return result.dependsOnAttendance
            }).catch(err=> {
              salSuccessError.push({empCode: employeeCode, empName: i.employee_name, branchName: i.branchName, 
                desigName: i.designationName, netSalary: null, isProcess: false, message: `Depend attend flag not found for ${earnDeductCode}!`});
              return null;
            })
  
  if (dependOnAttendFlag === null || dependOnAttendFlag === undefined || dependOnAttendFlag === [] ) {
      return false;
  } 

  if (!amount) {
    amount = 0;
  }

 let roundAmount = amount.toString().substring(amount.toString().indexOf("."))

 if (roundAmount === '.5' && dependOnAttendFlag === 'Y') {
  if (earnDeductCode === 'ER001') {
    finalAmount = Math.round(amount);
  } else {
    finalAmount = Number.parseFloat(amount).toFixed(2); 
  }
  } else if (roundAmount !== '.5' && dependOnAttendFlag === 'Y') {
    finalAmount = Math.round(amount);
  } else {
    finalAmount = amount;
 };

 if ((finalAmount-deductAmount) > 0) {
  const salaryData = {
      company_code: companyCode,
      employee_code: employeeCode,
      month: currentMonth,
      year: currentYear,     
      branch : salBranchCode,     
      salary_head: earnDeductCode,     
      attend_type: attendType,     
      from_date: startDate,  
      to_date: endDate,  
      amount: finalAmount ,  
      process_flag: processFlag , 
      working_hour: workDays,
      trn_code: trnCode, 
      pay_cycle: payCycle, 
      category: categoryCode, 
      bank_code: bankCode, 
      source: source,  
      reference: reference,   
      insert_by: currentUser,  
      insert_date: new Date()  
    }

 let processedSalData =  await processSalaryModel.create(salaryData)
                              .catch((err)=> {
                                salSuccessError.push({empCode: employeeCode, empName: i.employee_name, branchName: i.branchName, 
                                              desigName: i.designationName, netSalary: null, isProcess: false, message: 'Error to generate salary.'});
                                isSuccess = false;
                              });
    if (!isSuccess) {
      return false;
    }
  };
 };

 /************** Process start from this point ******************/

 let employeeList = 
      await dbConnect.query(
            `SELECT a.company_code, a.employee_code, a.employee_name, a.branch, a.designation, 
                    a.category, a.pay_cycle, a.emp_type, a.emp_status, a.pay_mode, a.emp_bank,
                    (SELECT branch_name FROM con_com_branchmaster 
                      WHERE company_code = a.company_code AND branch_code = a.branch) branchName,
                    b.designationName designationName, a.basic_pay, a.attend_flag
               FROM cor_employee_master a, con_designations b
              WHERE a.company_code = ${companyCode} 
                AND a.company_code = b.company_code
                AND a.designation = b.designationCode
                AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
                AND a.employee_code NOT IN ((SELECT employee_code
                                               FROM process_salary
                                              WHERE company_code = ${companyCode} 
                                                AND month = ${currentMonth}
                                                AND year = ${currentYear}
                                                AND process_flag = 'Y'))
                AND a.branch = IF ('${branchCode}' = 'All', a.branch, '${branchCode}')
                AND b.designationRank BETWEEN '${desigFrom}' and '${desigTo}'
                AND a.emp_status = (Select headcode
                                      FROM ph_empstatus
                                     WHERE compcde = a.company_code
                                       AND doppro = 'Y'
                                       AND headcode = a.emp_status)
                AND a.pay_cycle = ${payCycle}
                AND a.category = '${category}'
                AND a.process_flag = 'N'
                AND a.join_date <= DATE("${rawAttendanceTo}")
             UNION ALL
             SELECT a.company_code, a.employee_code, a.employee_name, a.branch, a.designation, 
                    a.category, a.pay_cycle, a.emp_type, a.emp_status, a.pay_mode, a.emp_bank,
                    (SELECT branch_name FROM con_com_branchmaster 
                      WHERE company_code = a.company_code AND branch_code = a.branch) branchName,
                    b.designationName designationName, a.basic_pay, a.attend_flag
               FROM cor_employee_master a, con_designations b
              WHERE a.company_code = '${companyCode}' 
                AND a.company_code = b.company_code
                AND a.designation = b.designationCode
                AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
                AND a.employee_code NOT IN ((SELECT employee_code
                                               FROM process_salary
                                              WHERE company_code = '${companyCode}' 
                                                AND month = '${currentMonth}'
                                                AND year = '${currentYear}'
                                                AND process_flag = 'Y'))
                AND a.branch = IF ('${branchCode}' = 'All', a.branch, '${branchCode}')
                AND b.designationRank BETWEEN '${desigFrom}' and '${desigTo}'
                AND a.emp_status = (Select headcode
                                      FROM ph_empstatus
                                     WHERE compcde = a.company_code
                                       AND doppro = 'N'
                                       AND headcode = a.emp_status)
                AND a.pay_cycle = ${payCycle}
                AND a.category = '${category}'
                AND a.process_flag = 'N'
                AND a.join_date <= DATE("${rawAttendanceTo}")
                AND a.employee_code IN (SELECT employee_code
                                          FROM employee_growth
                                         WHERE company_code = '${companyCode}'
                                           AND effective_date <> DATE(CONCAT('${currentMonth}-',LPAD('${currentMonth}',2,0),'-','01'))
                                           AND LAST_DAY(effective_date) = LAST_DAY(DATE(CONCAT('${currentMonth}-',LPAD('${currentMonth}',2,0),'-','01')))
                                           AND document_type IN ('SP','TR','RS','RE','EX','DS','RT'))
              ORDER BY  4,5, 1`,
        {type: QueryTypes.SELECT}
        )
    
    if (employeeList.length !== 0) {
    for (var i of employeeList) {
     empNetSalary = 0;
     isAttendance = true;
     isFetchStatus = true;
     isTaxCalculate = true;
     isSuccess = true;
     isPfSuccess = true;
     isActiveEmp = null;

     await processSalaryModel.destroy({
      where: {
        company_code: companyCode,
        employee_code: i.employee_code,
        month: currentMonth,
        year: currentYear,
        process_flag: 'N'
      }
     }).catch((err)=>{
        res.json({ isExecuted: false, message: `Error deleting salary of ${i.employee_code} !!!`});
        throw new Error(`Error deleting salary of ${i.employee_code} !!!`);
     }); 

     let taxRequestFlag = 
            await dbConnect.query(
                `Select IFNULL(tax_cal_request, 'N') as tax_cal_request
                From con_com_company_par
                Where company_code = '${companyCode}'`,
                {type: QueryTypes.SELECT, plain: true}
            ).then((flag) => {
              if (flag) {
                return flag.tax_cal_request
              } else {
                return 'N'
              }
            });
  
    if (!taxRequestFlag) {
       taxRequestFlag = 'N';
    }        

    if (taxRequestFlag === 'Y') {
     await taxCalculationFn(companyCode, i.employee_code, i.category,
                            i.pay_mode, i.emp_bank, null, 
                            null, currentMonth, currentYear,
                            processFlag, i.branch, payCycle,
                            currentUser);

     if (!isTaxCalculate) {
        await deleteSalaryProcess ( 
              companyCode, i.employee_code,
              currentMonth, currentYear,
              processFlag);
        continue;
     };
    }

    if (taxRequestFlag === 'N' || (taxRequestFlag === 'Y' && isTaxCalculate)) {
      let empGrowth = await dbConnect.query(`SELECT effective_date, DATE(effective_date-1) as mod_effective_date, old_basic
                                            FROM employee_growth
                                           WHERE company_code = ${companyCode}
                                             AND employee_code = ${i.employee_code}
                                             AND effective_date between DATE("${rawAttendanceFrom}") and DATE("${rawAttendanceTo}")
                                             AND document_type IN ('PR','IN','NP','CF','RJ','SU','DE')`,
                                          {type: QueryTypes.SELECT})   
       if (empGrowth.length !== 0) {                                                 
        for (growth of empGrowth) {
          var processStartDate = rawAttendanceFrom;
          var modifiedProcessEndDate = growth.mod_effective_date;
          var actualProcessEndDate = growth.effective_date
          nextProcessStartDate = growth.effective_date;

          if (modifiedProcessEndDate >= rawAttendanceFrom) {
            await promNonAttendanceFn(companyCode, i.employee_code , 
                                      i.category, i.pay_mode, 
                                      i.emp_bank, currentMonth ,
                                      currentYear, processStartDate, 
                                      modifiedProcessEndDate, workingHours, 
                                      growth.old_basic, processFlag,
                                      i.branch, i.pay_cycle, 
                                      totalDays);
            await fetchingAttendance( companyCode, i.employee_code ,
                                      i.category, i.pay_mode ,
                                      i.emp_bank, currentMonth ,
                                      currentYear, processStartDate,
                                      modifiedProcessEndDate, workingHours,
                                      growth.old_basic, totalDays,
                                      'Y', processFlag,
                                      i.branch, i.pay_cycle,
                                      currentUser);
            if (!isAttendance){
              await deleteSalaryProcess ( 
                companyCode, i.employee_code,
                currentMonth, currentYear,
                processFlag);
              continue;
            }                                                                
          }
          if (processFlag === 'Y'){
            await empGrowthModel.update(
              {process_flag: 'Y'},
                {where: {
                  company_code: companyCode,
                  employee_code: i.employee_code,
                  effective_date: actualProcessEndDate}
              })

            await empGrowthDetailModel.update(
              {process_flag: 'Y'},
                {where: {
                  company_code: companyCode,
                  employee_code: i.employee_code,
                  effective_date: actualProcessEndDate}
              })

            let countDisAct = 
              await dbConnect.query(`SELECT COUNT(*) as count           
                                       FROM disciplinary_action
                                      WHERE company_code = '${companyCode}'
                                        AND employee_code = '${i.employee_code}'
                                        AND effective_date <= DATE("${rawAttendanceFrom}")
                                        AND IFNULL(expire_date,DATE("${rawAttendanceTo}")) >= DATE("${rawAttendanceTo}")`, 
                                    {type: QueryTypes.SELECT, plain: true}
                                   ).then((actCount)=> {
                                     if (actCount) {
                                       return actCount.count;
                                     } else {
                                       return 0
                                     }
                                   });
            if (countDisAct > 0){ 
              await disActionModle.update(
                {process_flag: 'Y'},
                  {where: {
                    company_code: companyCode,
                    employee_code: i.employee_code,
                    effective_date: {[Op.lte]: rawAttendanceFrom},
                    expire_date: Sequelize.literal('expire_date')? {[Op.gte]: rawAttendanceTo} : rawAttendanceTo
                  }
                })
            }
          }
        }       
      }
      if (!isAttendance){
        await deleteSalaryProcess ( 
          companyCode, i.employee_code,
          currentMonth, currentYear,
          processFlag);
        continue;
      }
      
      await fetchingAttendance( companyCode, i.employee_code ,
                                i.category, i.pay_mode ,
                                i.emp_bank, currentMonth ,
                                currentYear, nextProcessStartDate,
                                rawAttendanceTo, workingHours,
                                i.basic_pay, totalDays,
                                'N', processFlag,
                                i.branch, i.pay_cycle,
                                currentUser);
      if (!isFetchStatus){
        await deleteSalaryProcess ( 
          companyCode, i.employee_code,
          currentMonth, currentYear,
          processFlag);
        isSuccess = false;
        continue;
      } else if (isFetchStatus) {
        await salaryNonAttendance(
                      companyCode, i.employee_code ,
                      i.category, i.pay_mode ,
                      i.emp_bank, currentMonth,
                      currentYear, nextProcessStartDate,
                      rawAttendanceTo, workingHours,
                      i.basic_pay, processFlag,
                      i.branch, i.pay_cycle,
                      totalDays);
        if (!isSuccess) {
          await deleteSalaryProcess ( 
            companyCode, i.employee_code,
            currentMonth, currentYear,
            processFlag);
          continue;
        }              
        
        await variableTransactions (
                      companyCode, i.employee_code,
                      i.category, i.pay_mode,
                      i.emp_bank, currentMonth,
                      currentYear, attendanceFrom,
                      attendanceTo , i.pay_cycle,
                      processFlag); 
                              
        if (!isSuccess) {
          await deleteSalaryProcess ( 
            companyCode, i.employee_code,
            currentMonth, currentYear,
            processFlag);
          continue;
        }  
        await  grossCalculation (
                      companyCode, i.employee_code,
                      i.category, i.emp_bank,
                      currentMonth, currentYear,
                      attendanceFrom , attendanceTo,
                      i.pay_cycle, processFlag,
                      i.pay_mode, totalDays, 
                      i.branch); 
        if (!isSuccess) {
          await deleteSalaryProcess ( 
            companyCode, i.employee_code,
            currentMonth, currentYear,
            processFlag);
          continue;
        }
        await checkPFAmount(companyCode, i.employee_code,
                            i.category, currentMonth,
                            currentYear, processFlag,
                            i.pay_cycle);   
        if (!isSuccess) {
          await deleteSalaryProcess ( 
            companyCode, i.employee_code,
            currentMonth, currentYear,
            processFlag);
          continue;
        }          
        if (processFlag === 'Y') {
            await creatingBackup(companyCode , i.employee_code,
                                i.category, i.pay_mode,
                                i.emp_bank, currentMonth,
                                currentYear, i.pay_cycle,
                                processFlag);

        }  
        if (!isSuccess) {
          await deleteSalaryProcess ( 
            companyCode, i.employee_code,
            currentMonth, currentYear,
            processFlag);
          continue;
        } else {
          await finalMessage(isSuccess);
        } 
      }
    }     
  } 
   
  if (isSuccess) {
   await updatePayCycle
              (companyCode, i.category, 
               currentMonth, currentYear, 
               i.pay_cycle, processFlag, 
               currentUser);
   if (!isSuccess) {
     res.json({isExecuted: false, message:'Pay Cycle update error!'})
     throw new Error('Pay Cycle update error!');
   }  
  }

 } else {
  return res.json({isExecuted: false, message: 'No employee found for processing!'});
 }
  return res.json({isExecuted: true, data: salSuccessError, message: 'Process End!'});
};


exports.getProcessSalByEmp = async (req, res) => {
  const empCode = req.query.employeeCode;
  const currentMonth = req.query.currentMonth;
  const currentYear = req.query.currentYear;
  const compCode = '200'

await dbConnect.query(`SELECT salary_head, SUM(amount) as amount
                         FROM process_salary
                        WHERE company_code = '${compCode}'
                          AND employee_code = '${empCode}'
                          AND month = '${currentMonth}'
                          AND year = '${currentYear}'
                          AND salary_head NOT IN ('ER999','ER990','DD990')
                        GROUP BY salary_head
                        ORDER BY substring(salary_head,1,2) DESC, substring(salary_head,3) ASC`,
                        {type: QueryTypes.SELECT})
                        .then((getData)=> {
                          if (getData) {
                            res.send(getData);
                            res.end();
                          } else {
                            res.send(null);
                          }
                        }).catch((err)=> {
                          console.log(`My Error: ${err}`)
                        });               
};


exports.getEmpListByParams = async (req, res) => {
    const payCycle = req.query.pay_cycle;
    const branchCode = req.query.branch_code;
    const desigFrom = req.query.designation_from;
    const desigTo = req.query.designation_to;
    const compCode = '200'

  await dbConnect.query(`SELECT a.id, a.company_code, a.employee_code, a.employee_name
                            FROM cor_employee_master a, con_designations b
                            WHERE a.company_code = '${compCode}'
                              AND a.company_code = b.company_code
                              AND a.designation = b.designationCode
                              AND branch = (CASE WHEN '${branchCode}' = 'All' THEN branch ELSE '${branchCode}' END)
                              AND a.emp_status = (Select headcode
                                                    FROM ph_empstatus
                                                  WHERE compcde = a.company_code
                                                    AND doppro = 'Y'
                                                    AND headcode = a.emp_status)
                              AND pay_cycle = ${payCycle}
                              AND b.designationRank BETWEEN ${desigFrom} AND ${desigTo}
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