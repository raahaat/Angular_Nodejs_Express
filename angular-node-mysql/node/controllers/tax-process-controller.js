const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const taxHistoryModel = require('../models/con-emp-tax-history');
const currentSalaryModel = require('../models/cor-emp-current-salary');
const empWiseTaxModel = require('../models/con-emp-wise-tax-setup');

exports.submitForTaxProcess = async (req, res) => {

/************** Process start from this point ******************/

  const formValue = req.body[0];
  const cycleValue = req.body[1];
  console.log(formValue);
  console.log(cycleValue);
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
  var taxSuccessError = [];
  var isSuccess = true; 
  var isTaxCalculate = true;
  var empTax = 0;
  var taxStatus = 'N';
  var taxCode = 'DD011';

  async function finalMessage (success) {
    if (success) {
      taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
             desigName: i.designationName, taxAmount: empTax, isProcess: true, message: ''});
    } else {
      taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
             desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Error to generate tax.'});
    }
  };

 let employeeList = 
 await dbConnect.query(
       `SELECT a.company_code, a.employee_code, a.employee_name, a.branch, a.designation, 
               a.category, a.pay_cycle, a.emp_type, a.emp_status, a.pay_mode, a.emp_bank,
               (SELECT branch_name FROM con_com_branchmaster 
                 WHERE company_code = a.company_code AND branch_code = a.branch) branchName,
               (SELECT description FROM designation 
                 WHERE company_code = a.company_code AND CONCAT(hard_code,soft_code) = a.designation) designationName, 
               a.basic_pay, a.attend_flag
          FROM cor_employee_master a, con_designations b
         WHERE a.company_code = '${companyCode}'
           AND a.company_code = b.company_code
           AND a.designation = b.designationCode
           AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
           AND a.employee_code NOT IN (SELECT employee_code 
                                         FROM employee_tax_history 
                                        WHERE company_code = '${companyCode}'
                                          And employee_code = a.employee_code
                                          And tax_month = '${currentMonth}'
                                          And tax_year = '${currentYear}'
                                          And tax_status IN ('Y','P'))
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
        UNION ALL
        SELECT a.company_code, a.employee_code, a.employee_name, a.branch, a.designation, 
               a.category, a.pay_cycle, a.emp_type, a.emp_status, a.pay_mode, a.emp_bank,
               (SELECT branch_name FROM con_com_branchmaster 
                 WHERE company_code = a.company_code AND branch_code = a.branch) branchName,
               (SELECT description FROM designation 
                 WHERE company_code = a.company_code AND CONCAT(hard_code,soft_code) = a.designation) designationName, 
               a.basic_pay, a.attend_flag
          FROM cor_employee_master a, con_designations b
         WHERE a.company_code = '${companyCode}' 
           AND a.company_code = b.company_code
           AND a.designation = b.designationCode
           AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
           AND a.employee_code NOT IN (SELECT employee_code 
                                         FROM employee_tax_history 
                                        WHERE company_code = '${companyCode}'
                                          And employee_code = a.employee_code
                                          And tax_month = '${currentMonth}'
                                          And tax_year = '${currentYear}'
                                          And tax_status IN ('Y','P'))
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
           AND a.employee_code IN (SELECT employee_code
                                     FROM employee_growth
                                    WHERE company_code = '${companyCode}'
                                      AND effective_date <> DATE(CONCAT('${currentMonth}-',LPAD('${currentMonth}',2,0),'-','01'))
                                      AND LAST_DAY(effective_date) = LAST_DAY(DATE(CONCAT('${currentMonth}-',LPAD('${currentMonth}',2,0),'-','01')))
                                      AND document_type IN ('SP','TR','RS','RE','EX','DS','RT'))
         ORDER BY  4,5, 1`,
   {type: QueryTypes.SELECT}
   );

   let taxEmpListCount = employeeList.length;
   if (taxEmpListCount !== 0) {
    for (let i of employeeList) {
      isTaxCalculate = true;
      isSuccess = true;
      empTax = 0;
      let empSalary = 
          await dbConnect.query(`Select a.employee_code,  a.designation, a.emp_type, a.sex, b.amount
                                          From cor_employee_master a, cor_emp_current_salary b 
                                        Where a.company_code = '${companyCode}'
                                          And a.company_code = b.company_code
                                          And a.employee_code = b.employee_code
                                          And a.employee_code = '${i.employee_code}'
                                          And b.salary_head IN ('ER000','ER011')`, {type: QueryTypes.SELECT})

      if (empSalary.length === 0) {
        taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
          desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Basic Head not found in current salary table.'});
        continue;
      } else {
        empTax = 
          await dbConnect.query(`SELECT desired_amount 
                                   FROM con_emp_wise_tax_setup
                                  WHERE company_code = '${companyCode}'
                                    AND employee_code = '${i.employee_code}'
                                    AND '${rawAttendanceTo}' BETWEEN effective_date AND expire_date`,
                                    {type: QueryTypes.SELECT, plain: true})
                                    .then((tax)=>{
                                      if (tax){
                                        return tax.desired_amount
                                      } else 
                                        return 0
                                    })
                                    .catch((error)=> {
                                      return 0
                                    })
        console.log('Tax: ' + empTax);  
        if (!empTax || empTax === 'undefined' || empTax === null) {
          empTax = 0;
        }                                  
        taxStatus = 'N';
        if (taxStatus === 'N') {
          await taxHistoryModel.destroy({
            where: {
              company_code: companyCode,
              employee_code: i.employee_code,
              tax_month: currentMonth,
              tax_year: currentYear
            }
          });

          let taxHistoryData = {
            company_code: companyCode,
            employee_code: i.employee_code,
            tax_month: currentMonth,
            tax_year: currentYear,
            tax_dr_amount: 0,
            tax_ac_amount: 0,
            tax_pay_amount: empTax,
            tax_balance: 0,
            tax_status: processFlag,
            tax_pay_date: new Date(),
            rebate_amount: 0,
            insert_by: currentUser,
            insert_date: new Date()
          };

          await taxHistoryModel.create(taxHistoryData)
                .catch((error)=> {
                  taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                    desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Error to insert data in Tax History table!'});
                  isTaxCalculate = false;
                  isSuccess = false;
                })
          if (!isTaxCalculate) {
            return false;
          };
          
          let taxCodeSalTable = 
              await currentSalaryModel.findAll({
                attributes: ['salary_head'],
                where: {
                  company_code : companyCode,
                  employee_code: i.employee_code,
                  salary_head: taxCode
                }
              })
              .then((code)=> {
                if (code) {
                  return code
                } else {
                  return null
                }
              })
              .catch((error)=> {
                return null;
              })

          if (taxCodeSalTable.length === 0) {
            if (empTax > 0) {
              let taxInSalTable = {
                  company_code: companyCode,
                  employee_code: i.employee_code,
                  salary_head: taxCode,
                  amount: empTax,
                  dependsOnAttendance: 'N',
                  process_flag: 'N',
                  insert_by: currentUser,
                  insert_date: new Date()
              }

              await currentSalaryModel.create(taxInSalTable)
              .catch((error)=> {
                taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                  desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Error to insert tax into Current Salary table!'});
                isTaxCalculate = false;
                isSuccess = false;
              })
              if (!isTaxCalculate) {
                continue;
              };
            }
          } else if (taxCodeSalTable.length === 1) {
            let taxSalHead = taxCodeSalTable[0]['salary_head'];
            if (taxSalHead === taxCode) {
              await currentSalaryModel.update({
                  amount: empTax,
                  update_by: currentUser,
                  update_date: new Date()
                  },{where: {
                    company_code: companyCode,
                    employee_code: i.employee_code,
                    salary_head: taxCode
                  }})
                  .catch((error)=> {
                    taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                      desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Salary table update error with tax amount!'});
                    isTaxCalculate = false;
                    isSuccess = false;
                  })
              if (!isTaxCalculate) {
                return false;
              };
            } else {
              if (empTax > 0) {
                let taxInSalTable = {
                    company_code: companyCode,
                    employee_code: i.employee_code,
                    salary_head: taxCode,
                    amount: empTax,
                    dependsOnAttendance: 'N',
                    process_flag: 'N',
                    insert_by: currentUser,
                    insert_date: new Date()
                }

                await currentSalaryModel.create(taxInSalTable)
                .catch((error)=> {
                  taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                    desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Error to insert tax in Current Salary table!'});
                  isTaxCalculate = false;
                  isSuccess = false;
                })
                if (!isTaxCalculate) {
                  continue;
                };
              }
            }
          } else if (taxCodeSalTable.length > 1) { 
            taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
              desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Too many tax code in Current Salary table!'});
            isTaxCalculate = false;
            isSuccess = false;
         }
         if (!isTaxCalculate) {
           continue;
         }
        }
      }
      if (!isSuccess) {
        taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
          desigName: i.designationName, taxAmount: null, isProcess: false, message: 'Error to generate tax.'});
        continue;
      } else {
      //  await finalMessage(isSuccess);
          taxSuccessError.push({empCode: i.employee_code, empName: i.employee_name, branchName: i.branchName, 
                 desigName: i.designationName, taxAmount: empTax, isProcess: true, message: ''});
      } 
    }
   } else {
    return res.json({isExecuted: false, message: 'No employee found for processing!'});
  }
  return res.json({isExecuted: true, data: taxSuccessError, message: 'Process End!'});
};



