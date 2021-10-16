const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const currentSalaryModel = require('../models/cor-emp-current-salary');

exports.submitForCarProcess = async (req, res) => {
let compCodeParam = req.body.company_code;
let assetCodeParam = req.body.asset_code;
let desigParam = req.body.designation;
let branchParam = req.body.branch;
let currentUser = req.body.insert_by;
let carArray = [];

async function car_maintenance_amount(carCompCode, carAssetCode,
                                      carEmpCode, carCurrentUser) {      
let totalAmount = 0;
let amount = 0; 
let loanAmount = 0; 
let netTotalAmount = 0;
let empCount = 0;
let totDays = 0;
let dayCount = 0;
let compCode = '200';

let employeeInfo = 
    await dbConnect.query(`SELECT a.employee_code, a.employee_name, 
                                  (Select designationName From con_designations where company_code = a.company_code 
                                      and designationCode = a.designation) designation_name,
                                  (Select branch_name From con_com_branchmaster 
                                    where company_code = a.company_code and branch_code = a.branch) branch_name                                                              
                             FROM cor_employee_master a
                            WHERE a.company_code = '${carCompCode}'
                              AND a.employee_code = '${carEmpCode}'`, {type: QueryTypes.SELECT})
let employeeCode = employeeInfo[0].employee_code;
let employeeName = employeeInfo[0].employee_name;
let employeeDesig = employeeInfo[0].designation_name;
let employeeBranch = employeeInfo[0].branch_name;

let earnAsset = [{
  earnCode: 'ER014', assetCode: carAssetCode
}] //query from table
for (let j of earnAsset) {
  let carRegisterData = 
    await dbConnect.query(`SELECT a.employee_code, b.designation, b.category, b.pay_cycle, a.car_register_date
                             FROM car_register a, cor_employee_master b
                            WHERE a.company_code = '${carCompCode}'
                              AND a.company_code = b.company_code
                              AND a.employee_code = b.employee_code
                              AND a.employee_code = '${carEmpCode}'
                              AND a.asset_code = '${j.assetCode}'
                              AND a.action_flag = 'Y'`, {type: QueryTypes.SELECT})
 if (carRegisterData.length > 0) {
   for (let k of carRegisterData) {
    totalAmount = 0;
    amount = 0; 
    loanAmount = 0; 
    empCount = 0;
    totDays = 0;
    dayCount = 0;
    netTotalAmount = 0;

    let carCost = 
      await dbConnect.query(`SELECT a.company_code, a.cost_code, (CASE WHEN a.cost_code = '001' THEN 'Fuel' 
                                    WHEN a.cost_code = '002' THEN 'Driver' 
                                    WHEN a.cost_code = '003' THEN 'Servicing' 
                                    ELSE null END) cost_desc,
                                    a.quantity costAmount
                               FROM car_cost_setup a
                              WHERE a.company_code = '${carCompCode}'
                                AND a.asset_code = '${j.assetCode}'
                                AND a.designation = '${k.designation}'`,{type: QueryTypes.SELECT}) //need to edit after table create
    if (carCost.length > 0) {
      for (var cost of carCost) {
        amount = amount + cost.costAmount;
      }      
    }

    if (amount > 0) {
      let carCount = 
        await dbConnect.query(`SELECT COUNT(b.employee_code) eCount, a.totalDays
                                 FROM con_paycycle a, car_register b
                                WHERE a.company_code = '${carCompCode}'
                                  AND a.company_code = b.company_code
                                  AND a.category = '${k.category}'
                                  AND a.paycycleNum = ${k.pay_cycle}
                                  AND b.car_register_date BETWEEN a.attendanceFrom AND a.attendanceTo
                                  AND b.employee_code = '${carEmpCode}'
                                  AND a.payStatus in ('N','S')
                                  AND b.car_register_date = '${k.car_register_date}'
                                GROUP BY a.totalDays`,{type: QueryTypes.SELECT})                                    
      if (carCount.length !== 1) {
        empCount = 0;
        totDays = 0;
      } else {
        empCount = carCount[0].eCount;
        totDays = carCount[0].totalDays;
      } 
       
    if (empCount > 0) {
      let regDate = new Date(k.car_register_date);
      let regMonthLastDay = new Date(regDate.getFullYear(), regDate.getMonth()+1, 0);
      let dateDifference = Math.abs(regMonthLastDay.getTime() - regDate.getTime());
      let dayCount = Math.ceil(dateDifference / (1000 * 3600 * 24)) + 1;

      amount = (amount/totDays)*dayCount;
    } else {
      amount = amount;
    }
    }
    totalAmount = Number(totalAmount) + Number(amount);
   }
 }
 
if (totalAmount > 0) {
  let loanSum = 
        await dbConnect.query(`SELECT IFNULL(SUM(a.installment_amount),0) loanSumAmount
                                 FROM pay_loans_advances a
                                WHERE a.company_code = '${carCompCode}'
                                  AND a.employee_code = '${carEmpCode}'
                                  AND a.loan_advance_code = 'AD002'
                                  AND Last_day(SYSDATE()) BETWEEN a.start_date AND a.end_date
                                  AND IFNULL(waived_flag, 'N') = 'A'`,
                                  {type: QueryTypes.SELECT, plain: true})
                                  .then((loanCount)=> {
                                    if (loanCount) {
                                      return loanCount.loanSumAmount;
                                    } else {
                                      return 0
                                    }})
                                    .catch((error)=> {
                                      return 0;
                                    }) 
loanSumAmount = loanSum;
netTotalAmount = Math.round(Number(totalAmount) + Number(loanSumAmount));

let salTableCodeCount = 
        await dbConnect.query(`SELECT COUNT(employee_code) count
                                 FROM cor_emp_current_salary
                                WHERE company_code = '${carCompCode}'
                                  AND employee_code = '${carEmpCode}'
                                  AND salary_head =  '${j.earnCode}'`,
                                  {type: QueryTypes.SELECT, plain: true})
                                  .then((headCount)=> {
                                    if (headCount) {
                                      return headCount.count;
                                   } else {
                                      return 0
                                    }})
                                   .catch((error)=> {
                                      return 0;
                                    }) 
 if (salTableCodeCount > 0) {
   let salUpdateData = {
      amount: netTotalAmount,
      update_by: currentUser,
      update_date: new Date()
   }
  await currentSalaryModel.update(salUpdateData,
    {where: {
      company_code: carCompCode,
      employee_code: carEmpCode, 
      salary_head: j.earnCode}})
    .then((updateData)=> {
      carArray.push({employeeCode, employeeName, employeeBranch, 
                     employeeDesig, loanSumAmount,totalAmount,netTotalAmount})
    })  
    .catch((error)=> {
      console.log(error);
    })
 } else {
    let salInsertData = {
      company_code: carCompCode,
      employee_code: carEmpCode, 
      salary_head: j.earnCode,
      amount: netTotalAmount,
      dependsOnAttendance: 'Y',
      process_flag: 'N',
      insert_by: currentUser,
      insert_date: new Date()
    }
    await currentSalaryModel.create(salInsertData)
    .then((data)=> {
      carArray.push({employeeCode, employeeName, employeeBranch, 
                     employeeDesig, loanSumAmount,totalAmount,netTotalAmount})
    })
    .catch((error)=> {
      console.log(error);
    })
 };
}
}
};

/************** Process start from this point ******************/

let employeeList = 
  await dbConnect.query(`Select Distinct a.employee_code,a.employee_name, a.company_code, a.branch, 
                                d.designationCode designation,d.designationName designation_name, d.designationRank,
                                (Select branch_name From con_com_branchmaster 
                                  where company_code = a.company_code and branch_code = a.branch) branch_name
                                  From cor_employee_master a, car_register b, ph_empstatus c, con_designations d 
                                    Where a.company_code = '${compCodeParam}'
                                      And a.company_code = b.company_code 
                                      And a.employee_code = b.employee_code 
                                      And b.asset_code = '${assetCodeParam}'
                                      And b.action_flag = 'Y'
                                      And a.emp_status = c.HEADCODE
                                      And c.HRDCDE = 'ST'
                                      And c.DOPPRO = 'Y'
                                      And a.designation = d.designationCode
                                      And d.hard_code = 'DG'
                                      And d.designationRank is not null 
                                      And a.branch = (CASE WHEN '${branchParam}'='All' THEN a.branch ELSE '${branchParam}' END)
                                      And d.designationCode = (CASE WHEN '${desigParam}'='All' THEN d.designationCode ELSE '${desigParam}' END)
                                    Order by d.designationRank`, 
                                    {type: QueryTypes.SELECT})

  if (employeeList.length > 0) {
    console.log(employeeList); 
    for (var i of employeeList) {
     await car_maintenance_amount (compCodeParam, assetCodeParam, 
                                   i.employee_code, currentUser);
    }
   return res.send(carArray);
  }                                   
};



