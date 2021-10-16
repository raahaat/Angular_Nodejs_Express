
const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const processSalaryModel = require('../models/process-salary')
const employeeModel = require('../models/cor-employee-master');
const companyParModel = require('../models/con-com-company-par');
const payCycleModel = require('../models/pay-cycle-setup-model')
const empDailyAttModel = require('../models/emp-daily-attendance');
const earnDeductContModel = require('../models/earn-deduct-contribution');
const empGrowthModel = require('../models/employee-growth');
const empGrowthDetailModel = require('../models/employee-growth-details');
const disActionModle = require('../models/disciplinary_action');
const variableTransactionModle = require('../models/variable-transaction');
const salaryHistoryModel = require('../models/salary-history');


exports.attendanceProcess = async (req, res) => {
  const formValue = req.body[0];
  const cycleValue = req.body[1];
  console.log(formValue);
  console.log(cycleValue);
  const companyCode = formValue.company_code;
  const employeeCodeFrom = formValue.employee_from;
  const employeeCodeTo = formValue.employee_to;
  const dateFrom = formValue.date_from;
  const dateTo = formValue.date_to;
  const payCycle = formValue.pay_cycle;
  const jobCode = formValue.job_code;
  const attType = formValue.attendance_type;
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
  var isAttendance = true; 
  var isSuccess = true;  
  var isFetchStatus = true; 
  var attSuccessError = [];
  var nextProcessStartDate = rawAttendanceFrom;

  let employeeCount = 
     await dbConnect.query(`Select IFNULL(COUNT(a.employee_code),0) count
                              From cor_employee_master a, ph_empstatus b, emp_daily_attendance c
                              where a.company_code = '${companyCode}'
                              And	a.company_code = c.company_code
                              And b.compcde = a.company_code
                              And a.employee_code = c.employee_code
                              And b.hrdcde = 'ST'
                              And b.headcode = a.emp_status
                              And b.doppro in ('Y','N')
                              And a.employee_code Between '${employeeCodeFrom}' And '${employeeCodeTo}'
                              And a.branch = (CASE WHEN '${jobCode}'='BASEDEPT' THEN a.branch ELSE '${jobCode}' END)
                              And c.attendance_date Between DATE("${dateFrom}") And DATE("${dateTo}")
                              And substr(c.attendance_type,1,2) In ('LV','AT') 
                              And a.pay_cycle = ${payCycle}
                              And IFNULL(a.process_flag,'N') = 'N'`, {type: QueryTypes.SELECT, plain: true})
                              .then((count)=> {
                                if (count) {
                                  return count.count;
                                } else {
                                  return 0;
                                }
                              })
                              .catch ((error)=> {
                                return res.json({isExecuted: false, message: 'Error to count employee list!'})
                              });
 console.log(employeeCount);     
 if (employeeCount > 0) {
   await dbConnect.query(`Delete From emp_daily_attendance
                           Where company_code = '${companyCode}'
                            And attendance_date BETWEEN DATE('${dateFrom}') AND DATE('${dateTo}')
                            And SUBSTR(attendance_type,1,2) IN ('LV','AT') 
                            And employee_code In (Select employee_code From cor_employee_master a, ph_empstatus b				
                                                  Where a.company_code = '${companyCode}'
                                                   And	a.company_code = b.COMPCDE
                                                    And b.HRDCDE = 'ST'
                                                    And b.DOPPRO in ('Y','N')
                                                    And a.emp_status =b.HEADCODE
                                                    And a.employee_code = emp_daily_attendance.employee_code
                                                    And a.employee_code BETWEEN '${employeeCodeFrom}' AND '${employeeCodeTo}'
                                                    And a.branch = (CASE WHEN '${jobCode}'='BASEDEPT' THEN a.branch ELSE '${jobCode}' END)
                                                    And a.pay_cycle =  ${payCycle}
                                                    And IFNULL(a.process_flag,'N') = 'N')`)
                                                    .catch((error)=> {
                                                      return res.json({isExecuted: false, message: 'Error to delete employee list!'})
                                                    })
 };    
 
 let employeeList = 
    await dbConnect.query (`Select a.employee_code, a.employee_name, (CASE WHEN 'BASEDEPT'='BASEDEPT' THEN a.branch ELSE '100' END) branch , a.basic_pay 
                              From cor_employee_master a, ph_empstatus b
                                            Where a.company_code = '${companyCode}'
                                              And b.COMPCDE = a.company_code
                                              And b.HRDCDE = 'ST'
                                              And b.DOPPRO = 'Y'
                                              And a.emp_status = b.HEADCODE
                                              And a.employee_code Between '${employeeCodeFrom}' And '${employeeCodeTo}'
                                              And a.branch = (CASE WHEN '${jobCode}'='BASEDEPT' THEN a.branch ELSE '${jobCode}' END)
                                              And a.pay_cycle =  ${payCycle}
                                              And IFNULL(a.process_flag,'N') = 'N'
                                            -- And IFNULL(a.pyempsex,'X') = Decode(IFNULL(:Crq2.pyappflg,'A'),'A',IFNULL(a.pyempsex,'X'),'M','M','F','F')
                                          Union All
                                          Select a.employee_code, a.employee_name, (CASE WHEN 'BASEDEPT'='BASEDEPT' THEN a.branch ELSE '100' END) branch, a.basic_pay 
                                            From cor_employee_master a, ph_empstatus b, employee_growth c
                                            Where a.company_code = '200'
                                              And a.company_code = c.company_code
                                              And a.employee_code = c.employee_code
                                              And b.COMPCDE = a.company_code
                                              And b.HRDCDE = 'ST'
                                              And b.DOPPRO = 'N'
                                              And a.emp_status = b.HEADCODE
                                              And a.employee_code Between '${employeeCodeFrom}' And '${employeeCodeTo}'
                                              And a.branch = (CASE WHEN '${jobCode}'='BASEDEPT' THEN a.branch ELSE '${jobCode}'  END)
                                              And a.pay_cycle =  ${payCycle}
                                              And IFNULL(a.process_flag,'N') = 'N'
                                            -- And IFNULL(a.pyempsex,'X') = Decode(IFNULL(:Crq2.pyappflg,'A'),'A',IFNULL(a.pyempsex,'X'),'M','M','F','F')
                                              AND LAST_DAY(effective_date) = LAST_DAY(DATE(CONCAT('${currentMonth}-',LPAD('${currentMonth}',2,0),'-','01')))
                                              AND c.document_type IN ('SP','TR','RS','RE','EX','DS')  
                                              Order By 1`,{type: QueryTypes.SELECT})
                                              .catch((error)=> {
                                                return res.json({isExecuted: false, message: 'Error to select employee list!'})
                                              });
 if ( employeeList.length !== 0) {
  for (i of employeeList) {
    for (let j=0; j < totalDays; j++ ) {
      var attendanceDate = new Date(dateFrom);
          attendanceDate.setDate(attendanceDate.getDate() + j);
        const attendanceValue = {
          company_code: companyCode,
          employee_code: i.employee_code,
          attendance_type: attType,
          attendance_date: attendanceDate,
          attendance_hours: workingHours, 
          attendance_code: '048', 
          attendance_category: null, 
          amount: 500, // test need to replace with real data
          source: 'GENERATE', 
          process_flag: 'N', 
          insert_by   : currentUser,
          insert_date : new Date()
        }

        await empDailyAttModel.create(attendanceValue)
          .catch((error)=> {
            isSuccess = false;
            return res.json({isExecuted: false, message: `Error to insert data for ${i.employee_code}`});
          }) 
  } 
 }
  if (isSuccess) {
    return res.json({isExecuted: true, message: `Attendance process successfully`});
  } 
 }
                                              
  
};