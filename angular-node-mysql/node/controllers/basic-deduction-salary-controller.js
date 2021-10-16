const variableModel = require('../models/variable-transaction');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');


exports.submitDataForBasicDeduction = async (req, res) => {
    const formValue = req.body[0];
    const cycleValue = req.body[1];
    let empCount = 0;
    let errorCOunt = 0;
    let isError = false;
    let isSuccess = false;
    let deductionSuccessError = [];
    const companyCode = formValue.company_code;
    const deductFrom = formValue.deduction_from;
    const deductCode = formValue.deduction_code;
    const daysInMonth = formValue.days_in_month;
    const noOfDays = formValue.no_of_days;
    const employeeCode = formValue.employee_code;
    const payCycle = formValue.pay_cycle;
    const branchCode = formValue.branch_code;
    const desigFrom = formValue.designation_from;
    const desigTo = formValue.designation_to;
    const processFlag = formValue.udpate_mode;
    const currentUser = formValue.insert_by;
    const currentMonth = cycleValue.currentMonth;
    const currentYear = cycleValue.currentYear;
    const rawAttendanceTo = cycleValue.attendanceTo;
    const category = cycleValue.category;

    async function finalMessage (error, element, deductAmount) {
      if (!error) {
        deductionSuccessError.push({empCode: element.employee_code, empName: element.employee_name, branchName: element.branchName, 
               desigName: element.designationName, deductionAmount: deductAmount, isProcess: true, message: ''});
      } else {
        deductionSuccessError.push({empCode: element.employee_code, empName: element.employee_name, branchName: element.branchName, 
               desigName: element.designationName, deductionAmount: null, isProcess: false, message: 'Error to deduct amount.'});
      }
    };

    let employeeList = 
      await dbConnect.query(
            `SELECT a.company_code, a.employee_code, a.employee_name, a.branch, a.designation, 
                    (SELECT branch_name FROM con_com_branchmaster 
                      WHERE company_code = a.company_code AND branch_code = a.branch) branchName,
                    b.designationName
               FROM cor_employee_master a, con_designations b
              WHERE a.company_code = ${companyCode} 
                AND a.company_code = b.company_code
                AND a.designation = b.designationCode
                AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
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
                AND a.employee_code NOT IN (SELECT employee_code
                                              FROM variable_transaction
                                             WHERE company_code = ${companyCode} 
                                               AND process_month = '${currentMonth}'
                                               AND process_year = '${currentYear}'
                                               AND process_flag = 'Y')
                AND a.join_date <= DATE("${rawAttendanceTo}")
             UNION ALL
             SELECT a.company_code, a.employee_code, a.employee_name, a.branch, a.designation,
                    (SELECT branch_name FROM con_com_branchmaster 
                      WHERE company_code = a.company_code AND branch_code = a.branch) branchName, 
                    b.designationName designationName
               FROM cor_employee_master a, con_designations b
              WHERE a.company_code = '${companyCode}' 
                AND a.company_code = b.company_code
                AND a.designation = b.designationCode
                AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
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
                AND a.employee_code NOT IN (SELECT employee_code
                                              FROM variable_transaction
                                             WHERE company_code = ${companyCode} 
                                               AND process_month = '${currentMonth}'
                                               AND process_year = '${currentYear}'
                                               AND process_flag = 'Y')
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
        employeeList.forEach(async element => {
        let basicGrossAmount = 0;
        let empDeductionAmount = 0;

          if (deductFrom == 'B') {
            basicGrossAmount = 
              await dbConnect.query(`Select Sum(amount) amount   
                                       From cor_emp_current_salary
                                      Where company_code = '${companyCode}'
                                        And employee_code = '${element.employee_code}'
                                        And salary_head IN ('ER000','ER011')`, 
                          {type: QueryTypes.SELECT,plain: true})     
          } else if (deductFrom == 'G') {
            basicGrossAmount = 
            await dbConnect.query(`Select Sum(CASE WHEN SUBSTRING(salary_head, 1, 2)= 'ER' 
                                                   THEN amount ElSE (amount*-1) 
                                                   END) amount
                                     From cor_emp_current_salary
                                    Where company_code = '${companyCode}'
                                      And employee_code = '${element.employee_code}'`, 
                        {type: QueryTypes.SELECT,plain: true}) 
          }

          empDeductionAmount = (basicGrossAmount.amount/daysInMonth) * noOfDays ; 
          empDeductionAmount = Math.round(empDeductionAmount);
 
          let tableData = {
            company_code: companyCode ,
            employee_code: element.employee_code,
            process_month: currentMonth,
            process_year : currentYear ,
            branch: element.branch,
            salary_head: deductCode,
            amount: empDeductionAmount,
            days: noOfDays,
            naration: 'Basic Deduction',
            process_flag: 'N',
            insert_by : currentUser,
            insert_date: new Date()
          } 

          let findDuplicate =
            await variableModel.findOne({
              where: {
                company_code: companyCode,
                process_month: currentMonth,
                process_year: currentYear,
                employee_code: element.employee_code,
                process_flag: 'N'
              }
            })

          if (findDuplicate) {
             await variableModel.destroy({
                where: {
                  company_code: companyCode,
                  process_month: currentMonth,
                  process_year: currentYear,
                  employee_code: element.employee_code,
                  process_flag: 'N'
                }
              })
          } 

          await variableModel.create(tableData)
            .then(()=> {
              isError = false;
            })
            .catch(error=> {
              isError = true;                  
            }) 
            
          empCount = empCount+1;  

          if (isError) {
            await finalMessage(isError, element, empDeductionAmount);
          } else {
            await finalMessage(isError, element, empDeductionAmount);
          }

          if (employeeList.length == empCount) {
            return res.json({isExecuted: true, data: deductionSuccessError, message: 'Process End!'})  
          }            
    })     
    } else {
      return res.json({isExecuted: false, message: 'No emloyee found for process.'})
    }     
}; 

 




 



