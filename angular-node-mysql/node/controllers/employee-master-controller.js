const empMasterModel = require('../models/cor-employee-master');
const empAddressModel = require('../models/cor-emp-address');
const empSalaryModel = require('../models/cor-emp-current-salary');
const leaveMasterModel = require('../models/cor-leave-master');
const empEduModel = require('../models/cor-emp-education');
const empExperienceModel = require('../models/cor-emp-experience');
const { Op, where } = require('sequelize');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const companyCode = '200';


exports.getEmployeeMaster = async (req, res) => {
  try {
    let empList = 
    await dbConnect.query(
      `SELECT a.id,
              a.employee_code,
              a.employee_name,
              designation,
              (SELECT designationName
                FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.designation
                  AND designationRank IS NOT NULL) AS designation_name,
              a.branch,
              (SELECT branch_name
                FROM con_com_branchmaster
                WHERE company_code = a.company_code 
                  AND branch_code = a.branch) AS branch_name,
              a.division,
              (SELECT description
                FROM con_grades
                WHERE company_code = a.company_code 
                  AND gradeCode = a.division) AS division_name,
              a.join_date
         FROM cor_employee_master a,
              ph_empstatus b
        WHERE a.company_code = '${companyCode}' 
          AND IFNULL(a.approve_flag, 'N') = 'Y'    
          AND b.COMPCDE = a.company_code 
          AND b.HEADCODE = a.emp_status
          AND b.DOPPRO = 'Y'
        ORDER BY a.employee_code`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: empList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee list..'});
    res.end(); 
  }
};


exports.getEmpIdDuplicateCheck = async (req, res) => {
  let empId = req.params.id;
  
  try {
    let idCheck = 
    await dbConnect.query(
      `SELECT count(employee_code) emp_count
         FROM cor_employee_master
        WHERE company_code = '${companyCode}'
          AND employee_code = '${empId}'`,
      { type: QueryTypes.SELECT, plain:true }
    );
 
    res.json(idCheck);
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee id check..'});
    res.end(); 
  }
}


exports.addEmployeeMaster = async (req, res) => {
  let salaryArray = req.body.times;
        
  const formData = {  
    company_code  : req.body.company_code,
    employee_code : req.body.employee_code,
    employee_name : req.body.employee_name,   
    join_date     : req.body.join_date,
    branch        : req.body.branch,
    division      : req.body.division,
    department    : req.body.department,   
    designation   : req.body.designation,
    category      : req.body.category,
    offer_letter  : req.body.offer_letter,
    offer_date    : req.body.offer_date,
    join_rank     : req.body.join_rank,
    location      : req.body.location,
    nationality   : req.body.nationality,
    marital_status: req.body.marital_status,
    spouse_name   : req.body.spouse_name,
    spouse_birth  : req.body.spouse_birth,
    birth_date    : req.body.birth_date,
    sex           : req.body.sex,
    religion      : req.body.religion,
    voter_id      : req.body.voter_id,
    father_name   : req.body.father_name,
    mother_name   : req.body.mother_name,
    emp_type      : req.body.emp_type,    
    emp_status    : req.body.emp_status,    
    email         : req.body.email,
    insert_by     : req.body.insert_by,
    insert_date   : req.body.insert_date
  };

  empMasterModel.create(formData)
  .then((empData)=> {
    salaryArray.map(salData => {
      salData.employee_code = empData.employee_code;
    });
    empSalaryModel.bulkCreate(salaryArray)
    .then((data) => {
      res.json({message : 'Successfully inserted.'});
      res.end();
    })
    .catch((err)=> {
      console.log('error');
    })

    res.json({message : 'Successfully inserted.'});
    res.end();
  }).catch((err)=> {
      console.log('Error');
  })
};


exports.getEmployeeMasterById = async (req, res) => {
  let empId = req.params.id;
  
  try {
    let singleEmp = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              a.employee_name,
              a.join_date,
              a.branch,
              (SELECT branch_name
                 FROM con_com_branchmaster
                WHERE company_code = a.company_code 
                  AND branch_code = a.branch) AS branch_name,
              a.division,
              (SELECT description
                 FROM con_grades
                WHERE company_code = a.company_code 
                  AND gradeCode = a.division) AS division_name,
              a.department,
              (SELECT description
                 FROM con_department
                WHERE company_code = a.company_code 
                  AND dept_code = a.department) AS department_name,
              a.designation,
              (SELECT designationName
                 FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.designation
                  AND designationRank IS NOT NULL) AS designation_name,
              a.category,
              a.basic_pay,
              a.currency,
              a.pay_rule,
              a.gratuity_rule,
              a.leave_rule,
              a.pay_cycle,
              a.attend_flag,
              (CASE WHEN a.attend_flag = 'M' THEN 'Monthly' ELSE 'Daily' END) AS attend_flag_name,
              a.pay_mode,
              (CASE WHEN a.pay_mode = 'B' THEN 'Bank' ELSE 'Cash' END) AS pay_mode_name,
              a.company_bank,
              (SELECT bankName
                FROM banks
               WHERE company_code = a.company_code 
                 AND bankCode = a.company_bank) AS company_bank_name,
              a.emp_bank,
              (SELECT bankName
                 FROM banks
                WHERE company_code = a.company_code 
                  AND bankCode = a.emp_bank) AS emp_bank_name,
              a.account_no,
              a.account_type,
              a.bank_loan,
              a.rejoin,
              a.process_flag,
              a.offer_letter,
              a.offer_date,
              a.join_rank,
              (SELECT designationName
                 FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.join_rank) join_rank_name,
              a.location,
              a.nationality,
              get_code_description('200', a.nationality) nationality_name,
              a.marital_status,
              get_code_description('200', a.marital_status) marital_status_name,
              a.spouse_name,
              a.spouse_birth,
              a.dependent,
              a.children,
              a.birth_date,
              a.birth_place,
              (SELECT pycoddes
                 FROM districts
                WHERE pycomcde = a.company_code 
                  AND CONCAT(pyhdrcde, pysofcde) = a.birth_place) AS birth_place_name,
              a.sex,
              get_code_description('200', a.sex) sex_name,
              a.religion,
              get_code_description('200', a.religion) religion_name,
              a.height,
              a.weight,
              a.blood_group,
              get_code_description('200', a.blood_group) blood_group_name,
              a.voter_id,
              a.tin_no,
              a.passport_no,
              a.hobbies,
              a.fredom_fighter,
              a.fredom_date,
              a.father_name,
              a.mother_name,
              a.emp_type,
              get_code_description('200', a.emp_type) emp_type_name,
              a.confirm_flag,
              a.confirm_date,
              a.emp_status,
              a.status_date,
              a.reference,
              a.email
        FROM cor_employee_master a,
              ph_empstatus b
        WHERE     a.company_code = '${companyCode}'
              AND a.employee_code = '${empId}'
              AND b.COMPCDE = a.company_code
              AND b.HEADCODE = a.emp_status 
              AND b.DOPPRO = 'Y'`,
      { type: QueryTypes.SELECT, plain:true }
    );
 
    res.json({isExecuted: true, data: singleEmp});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee information..'});
    res.end(); 
  }
};


exports.updateEmployeeMaster = async (req, res) => {
  let editId = req.params.id;  

  empMasterModel.update({
    // id            : req.body.id,
    employee_code : req.body.employee_code,
    employee_name : req.body.employee_name, 
    join_date     : req.body.join_date,          
    branch        : req.body.branch,
    division      : req.body.division,
    department    : req.body.department, 
    designation   : req.body.designation, 
    category      : req.body.category,
    basic_pay     : req.body.basic_pay,
    currency      : req.body.currency,
    pay_rule      : req.body.pay_rule,
    gratuity_rule : req.body.gratuity_rule,
    leave_rule    : req.body.leave_rule,
    pay_cycle     : req.body.pay_cycle,
    attend_flag   : req.body.attend_flag,
    pay_mode      : req.body.pay_mode,
    company_bank  : req.body.company_bank,
    emp_bank      : req.body.emp_bank,
    account_no    : req.body.account_no,
    account_type  : req.body.account_type,
    bank_loan     : req.body.bank_loan,
    rejoin        : req.body.rejoin,
    process_flag  : req.body.process_flag,
    offer_letter  : req.body.offer_letter,
    offer_date    : req.body.offer_date,
    join_rank     : req.body.join_rank,
    location      : req.body.location,
    nationality   : req.body.nationality,
    marital_status: req.body.marital_status,
    spouse_name   : req.body.spouse_name,
    spouse_birth  : req.body.spouse_birth,
    dependent     : req.body.dependent,
    children      : req.body.children,
    birth_date    : req.body.birth_date,
    birth_place   : req.body.birth_place,
    sex           : req.body.sex,
    religion      : req.body.religion,
    height        : req.body.height,
    weight        : req.body.weight,
    blood_group   : req.body.blood_group,
    voter_id      : req.body.voter_id,    
    tin_no        : req.body.tin_no,
    passport_no   : req.body.passport_no,
    hobbies       : req.body.hobbies,
    fredom_fighter: req.body.fredom_fighter,
    fredom_date   : req.body.fredom_date,
    father_name   : req.body.father_name,
    mother_name   : req.body.mother_name, 
    emp_type      : req.body.emp_type,
    confirm_flag  : req.body.confirm_flag,
    confirm_date  : req.body.confirm_date,
    emp_status    : req.body.emp_status,
    status_date   : req.body.status_date,
    reference     : req.body.reference,    
    email         : req.body.email, 
    contract_start: req.body.contract_start,
    contract_expired: req.body.contract_expired,  
    update_by     : req.body.update_by,
    update_date   : req.body.update_date 
  }, {where: {id: editId}}
  )

  .then((updated)=> {
    res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + editId});
    res.end();
  })
  .catch (err => {
    res.json({isExecuted:false, message:"Unknown Error: "+ err});
    res.end();
  })
};


// exports.deleteEmployeeMaster = async (req, res) => {
//     let deleteId = req.params.id;
    
//     empMasterModel.destroy(
//       { where: {id: deleteId}}
//     )
//     .then(deletedData => {
//           res.json({isExecuted:true, data: deletedData});
//           res.end();
//         })
//       .catch(err => {
//         res.json({isExecuted:false, message: "Education Board is not deleted for : "+ deleteId});
//         res.end();
//     });
// };


// Employee Address

exports.getEmpAddressById = async (req, res) => {
  let empId = req.params.id;

  try {
    let empAddress = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              a.address_type,
              a.address,
              a.district,
              (SELECT name
                 FROM district
                WHERE code = a.district) district_name,
              a.upazila,
              (SELECT name
                 FROM police_station
                WHERE code = a.upazila) upazila_name,
              a.country,
              (SELECT description
                 FROM con_code_master
                WHERE company_code = '${companyCode}'
                  AND hard_code = 'CR'
                  AND code = a.country) country_name,
              a.phone_no
        FROM cor_emp_address a
        WHERE a.company_code = '${companyCode}'
          AND a.employee_code = '${empId}'
          AND a.valid_status = 'A'`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: empAddress});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee address..'});
    res.end(); 
  }
};


exports.updateEmpAddress = async (req, res) => {
  try {
    if(req.body.presentAddress.id) {
      await empAddressModel.update({
        address   : req.body.presentAddress.address,
        district  : req.body.presentAddress.district,
        upazila   : req.body.presentAddress.upazila,
        country   : req.body.presentAddress.country,
        phone_no  : req.body.presentAddress.phone_no,
        }, {where: {
          id            : req.body.presentAddress.id,
          company_code  : req.body.presentAddress.company_code,
          address_type  : req.body.presentAddress.address_type,
          employee_code : req.body.presentAddress.employee_code
        }
      })
    } else {
      await empAddressModel.create(req.body.presentAddress);
    }

    if(req.body.permanentAddress.id) {
      await empAddressModel.update({
        address   : req.body.permanentAddress.address,
        district  : req.body.permanentAddress.district,
        upazila   : req.body.permanentAddress.upazila,
        country   : req.body.permanentAddress.country,
        phone_no  : req.body.permanentAddress.phone_no,
        }, {where: {
          id            : req.body.permanentAddress.id,
          company_code  : req.body.permanentAddress.company_code,
          address_type  : req.body.permanentAddress.address_type,
          employee_code : req.body.permanentAddress.employee_code
        }
      })
    } else {
      await empAddressModel.create(req.body.permanentAddress);
    }

    return res.json({isExecuted: true, message: 'Successfully updated!'})
    
  } catch (err){
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    console.log(err);
    res.end();
  }
};


exports.getDistrictList = async (req, res) => {

  try {
    let district = 
    await dbConnect.query(
      `SELECT code, name
         FROM district
        WHERE company_code = '${companyCode}'
        ORDER BY name`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: district});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee address..'});
    res.end(); 
  }
};


exports.getUpazilaListByDistrict = async (req, res) => {
  let distId = req.params.id

  try {
    let upazila = 
    await dbConnect.query(
      `SELECT code, name
         FROM police_station
        WHERE company_code = '${companyCode}'
          AND district_code = '${distId}'
        ORDER BY name`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: upazila});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee address..'});
    res.end(); 
  }
};





// Employee Current Salary

exports.getEmpSalaryById = async (req, res) => {
  let empId = req.params.id;

  try {
    let empSalary = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              a.salary_head,
              (SELECT headName
                FROM con_earn_head
                WHERE company_code = '200' AND headCode = a.salary_head)
                salary_head_name,
              a.amount,
              a.dependsOnAttendance,
              (CASE
                WHEN a.dependsOnAttendance = 'Y' THEN 'Yes'
                WHEN a.dependsOnAttendance = 'N' THEN 'No'
              END) AS dependsOnAttendance_name
         FROM cor_emp_current_salary a
        WHERE a.company_code = '${companyCode}' 
          AND a.employee_code = '${empId}'
        ORDER BY SUBSTR(salary_head, 1, 2) DESC, salary_head`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: empSalary});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee leave data..'});
    res.end(); 
  }
};


exports.deleteEmpSalary = async (req, res) => {
  let deleteId = req.params.id;
  
  empSalaryModel.destroy(
    { where: {id: deleteId}}
  )
  .then(deletedData => {
        res.json({isExecuted:true, data: deletedData, message: 'Data deleted successfully!'});
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Employee salary is not deleted for : "+ deleteId});
      res.end();
  });
};


exports.getDesigWiseSalary = async (req, res) => {
  let des_code = req.params.desCode;
  try {
    let desigSalary = 
    await dbConnect.query(
      `SELECT a.earning_code, b.headName, a.amount
         FROM con_desig_salary_setup a, con_earn_head b
        WHERE a.company_code = '${companyCode}'
          AND a.designation = '${des_code}'
          AND b.company_code = a.company_code
          AND b.headCode = a.earning_code
          AND a.effective_date =
                  (SELECT max(effective_date)
                     FROM con_desig_salary_setup
                    WHERE company_code = a.company_code 
                      AND designation = a.designation)
      ORDER BY SUBSTRING(a.earning_code, 1, 2) DESC, a.earning_code`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: desigSalary});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee leave data..'});
    res.end(); 
  }
};


// Employee Leave

exports.getEmpLeaveById = async (req, res) => {
  let empId = req.params.id;

  try {
    let empLeave = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              a.leave_code,
              (SELECT leave_name
                 FROM con_cor_leave_master
                WHERE company_code = a.company_code 
                  AND leave_code = a.leave_code) leave_name,
              a.acr_date,
              a.eligible_start,
              a.eligible_end,
              a.yearly_balance,
              a.leave_avail,
              (a.yearly_balance + a.leave_avail) total_balance,
              a.leave_encash
         FROM cor_leave_master a
        WHERE a.company_code = '${companyCode}'
          AND a.employee_code = '${empId}'
        ORDER BY a.leave_code`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: empLeave});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee leave data..'});
    res.end(); 
  }
};


exports.updateEmpLeave = async (req, res) => {
  const objKeys = Object.keys(req.body.obj);
   console.log(req.body.obj);
  try {
       for (let i = 0; i < objKeys.length; i++) { 
          let id = req.body.obj[objKeys[i]].id;
          const formData = {  
            company_code  : req.body.obj[objKeys[i]].company_code,
            employee_code : req.body.obj[objKeys[i]].employee_code,             
            leave_code    : req.body.obj[objKeys[i]].leave_code,
            yearly_balance: req.body.obj[objKeys[i]].yearly_balance,
            leave_avail   : req.body.obj[objKeys[i]].leave_avail,
            leave_encash  : req.body.obj[objKeys[i]].leave_encash,
            acr_date      : req.body.obj[objKeys[i]].acr_date,
            eligible_start: req.body.obj[objKeys[i]].eligible_start,
            eligible_end  : req.body.obj[objKeys[i]].eligible_end,            
            insert_by     : req.body.obj[objKeys[i]].insert_by ,  
            insert_date   : req.body.obj[objKeys[i]].insert_date,
            update_by     : req.body.obj[objKeys[i]].update_by ,  
            update_date   : req.body.obj[objKeys[i]].update_date  
          };
          
          if (id) {
            await leaveMasterModel.update( 
              {
                leave_code    : req.body.obj[objKeys[i]].leave_code,
                yearly_balance: req.body.obj[objKeys[i]].yearly_balance,
                leave_avail   : req.body.obj[objKeys[i]].leave_avail,
                leave_encash  : req.body.obj[objKeys[i]].leave_encash,
                acr_date      : req.body.obj[objKeys[i]].acr_date,
                eligible_start: req.body.obj[objKeys[i]].eligible_start,
                eligible_end  : req.body.obj[objKeys[i]].eligible_end, 
                update_by     : req.body.obj[objKeys[i]].update_by ,  
                update_date   : req.body.obj[objKeys[i]].update_date  
              },
              {where: 
                {
                  id            : id,
                  company_code  : companyCode, 
                  employee_code : req.body.obj[objKeys[i]].employee_code
                }
              }
                  ).catch (err => {
                  console.log(err);
               })
          } else {
             await leaveMasterModel.create(formData);
          }  
       }

    res.json({isExecuted:true, message:"Data successfully updated!"});
    res.end();
  } catch (err){
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    res.end();
  }
};


exports.deleteEmpLeave = async (req, res) => {
    let deleteId = req.params.id;
    
    leaveMasterModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData, message: 'Data deleted successfully!'});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Employee leave is not deleted for : "+ deleteId});
        res.end();
    });
};



// Employee Education

exports.getEmpEducationById = async (req, res) => {
  let empId = req.params.id

  try {
    let empEdu = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              a.exam_name,
              (SELECT examName
                 FROM con_exams
                WHERE company_code = a.company_code 
                  AND examCode = a.exam_name) AS exam_name_desc,
              a.board,
              (SELECT description
                 FROM con_edu_board
                WHERE company_code = a.company_code
                  AND CONCAT (hard_code, soft_code) = a.board) AS board_name,
              a.result,
              (SELECT description
                 FROM con_exam_result
                WHERE company_code = a.company_code
                  AND CONCAT (hard_code, soft_code) = a.result) AS result_name,
              a.pass_year,
              a.subject,
              (SELECT description
                FROM con_com_subj
               WHERE company_code = a.company_code
                 AND CONCAT (hard_code, soft_code) = a.subject) AS subject_name,
              a.duration,
              a.institute,
              (SELECT Pycoddes
                 FROM institute
                WHERE Pycomcde = a.company_code 
                  AND Pysofcde = a.institute) AS institute_name
         FROM cor_emp_education a
        WHERE a.company_code = '${companyCode}' 
          AND a.employee_code = '${empId}'
        ORDER BY a.edu_level`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: empEdu});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee education data..'});
    res.end(); 
  }
};


exports.updateEmpEducation = async (req, res) => {
  const objKeys = Object.keys(req.body.obj);
   console.log(req.body.obj);
  try {
       for (let i = 0; i < objKeys.length; i++) { 
          let id = req.body.obj[objKeys[i]].id;
          const formData = {  
            company_code  : req.body.obj[objKeys[i]].company_code,
            employee_code : req.body.obj[objKeys[i]].employee_code,  
            edu_level     : req.body.obj[objKeys[i]].edu_level, 
            exam_name     : req.body.obj[objKeys[i]].exam_name, 
            board         : req.body.obj[objKeys[i]].board, 
            result        : req.body.obj[objKeys[i]].result, 
            grade_flag    : req.body.obj[objKeys[i]].grade_flag, 
            outof         : req.body.obj[objKeys[i]].outof, 
            pass_year     : req.body.obj[objKeys[i]].pass_year, 
            group         : req.body.obj[objKeys[i]].group, 
            subject       : req.body.obj[objKeys[i]].subject, 
            duration      : req.body.obj[objKeys[i]].duration, 
            institute     : req.body.obj[objKeys[i]].institute,               
            insert_by     : req.body.obj[objKeys[i]].insert_by ,  
            insert_date   : req.body.obj[objKeys[i]].insert_date,
            update_by     : req.body.obj[objKeys[i]].update_by ,  
            update_date   : req.body.obj[objKeys[i]].update_date  
          };
          
          if (id) {
            await empEduModel.update( 
              {
                edu_level     : req.body.obj[objKeys[i]].edu_level, 
                exam_name     : req.body.obj[objKeys[i]].exam_name, 
                board         : req.body.obj[objKeys[i]].board, 
                result        : req.body.obj[objKeys[i]].result, 
                grade_flag    : req.body.obj[objKeys[i]].grade_flag, 
                outof         : req.body.obj[objKeys[i]].outof, 
                pass_year     : req.body.obj[objKeys[i]].pass_year, 
                group         : req.body.obj[objKeys[i]].group, 
                subject       : req.body.obj[objKeys[i]].subject, 
                duration      : req.body.obj[objKeys[i]].duration, 
                institute     : req.body.obj[objKeys[i]].institute  
              },
              {where: 
                {
                  id            : id,
                  company_code  : companyCode, 
                  employee_code : req.body.obj[objKeys[i]].employee_code
                }
              }
                  ).catch (err => {
                  console.log(err);
               })
          } else {
             await empEduModel.create(formData);
          }  
       }

    res.json({isExecuted:true, message:"Data successfully updated!"});
    res.end();
  } catch (err){
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    res.end();
  }
};


exports.deleteEmpEducation = async (req, res) => {
    let deleteId = req.params.id;
    
    empEduModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Employee education is not deleted for : "+ deleteId});
        res.end();
    });
};



// Employee Experience 

exports.getEmpExperienceById = async (req, res) => {
  let empId = req.params.id;

  try {
    let empEdu = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              a.designation,
              (SELECT designationName
                FROM con_other_desigs
                WHERE company_code = a.company_code
                  AND designationCode = a.designation) AS designation_name,
              a.company,
              (SELECT description
                FROM con_company_list
                WHERE company_code = a.company_code
                  AND hard_code = 'CM'
                  AND soft_code = a.company) company_name,
              a.branch,
              a.work_area,
              (SELECT description
                FROM con_department
                WHERE company_code = a.company_code
                  AND hard_code = 'DV'
                  AND dept_code = a.work_area) work_area_name,
              a.achievement,
              a.from_date,
              a.to_date
        FROM cor_emp_experience a
        WHERE a.company_code = '${companyCode}' 
          AND a.employee_code = '${empId}'
        ORDER BY a.serial_no`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: empEdu});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee experience data..'});
    res.end(); 
  }
};


exports.updateEmpExperience = async (req, res) => {
  const objKeys = Object.keys(req.body.obj);
   console.log(req.body.obj);
  try {
       for (let i = 0; i < objKeys.length; i++) { 
          let id = req.body.obj[objKeys[i]].id;
          const formData = {  
            company_code  : req.body.obj[objKeys[i]].company_code,
            employee_code : req.body.obj[objKeys[i]].employee_code,        
            serial_no     : req.body.obj[objKeys[i]].serial_no, 
            designation   : req.body.obj[objKeys[i]].designation, 
            company       : req.body.obj[objKeys[i]].company, 
            branch        : req.body.obj[objKeys[i]].branch, 
            work_area     : req.body.obj[objKeys[i]].work_area, 
            achievement   : req.body.obj[objKeys[i]].achievement, 
            from_date     : req.body.obj[objKeys[i]].from_date, 
            to_date       : req.body.obj[objKeys[i]].to_date,                          
            insert_by     : req.body.obj[objKeys[i]].insert_by ,  
            insert_date   : req.body.obj[objKeys[i]].insert_date,
            update_by     : req.body.obj[objKeys[i]].update_by ,  
            update_date   : req.body.obj[objKeys[i]].update_date  
          };
          
          if (id) {
            await empExperienceModel.update( 
              {
                serial_no     : req.body.obj[objKeys[i]].serial_no, 
                designation   : req.body.obj[objKeys[i]].designation, 
                company       : req.body.obj[objKeys[i]].company, 
                branch        : req.body.obj[objKeys[i]].branch, 
                work_area     : req.body.obj[objKeys[i]].work_area, 
                achievement   : req.body.obj[objKeys[i]].achievement, 
                from_date     : req.body.obj[objKeys[i]].from_date, 
                to_date       : req.body.obj[objKeys[i]].to_date, 
                update_by     : req.body.obj[objKeys[i]].update_by ,  
                update_date   : req.body.obj[objKeys[i]].update_date  
              },
              {where: 
                {
                  id            : id,
                  company_code  : companyCode, 
                  employee_code : req.body.obj[objKeys[i]].employee_code
                }
              }
                  ).catch (err => {
                  console.log(err);
               })
          } else {
             await empExperienceModel.create(formData);
          }  
       }

    res.json({isExecuted:true, message:"Data successfully updated!"});
    res.end();
  } catch (err){
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    res.end();
  }
};


exports.deleteEmpExperience = async (req, res) => {
    let deleteId = req.params.id;
    
    empExperienceModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Employee education is not deleted for : "+ deleteId});
        res.end();
    });
};




// Employee Approval 

exports.getEmployeeApproval = async (req, res) => {  
  try {
    let empList = 
    await dbConnect.query(
      `SELECT a.id,
              a.employee_code,
              a.employee_name,
              designation,
              (SELECT designationName
                 FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.designation
                  AND designationRank IS NOT NULL) AS designation_name,
              a.branch,
              (SELECT branch_name
                 FROM con_com_branchmaster
                WHERE company_code = a.company_code 
                  AND branch_code = a.branch) AS branch_name,
              a.division,
              (SELECT description
                 FROM con_grades
                WHERE company_code = a.company_code 
                  AND gradeCode = a.division) AS division_name,
              a.join_date
        FROM cor_employee_master a, ph_empstatus b
        WHERE a.company_code = '${companyCode}'
          AND IFNULL(a.approve_flag, 'N') != 'Y'
          AND b.COMPCDE = a.company_code
          AND b.HEADCODE = a.emp_status
          AND b.DOPPRO = 'Y'
        ORDER BY a.employee_code`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: empList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee list..'});
    res.end(); 
  }
};


exports.updateEmployeeApproval = async (req, res) => {
  try {
    const objKeys = Object.keys(req.body.obj);
    console.log(objKeys);
    for (let i = 0; i <= objKeys.length; i++) {
      await empMasterModel.update(
        {
          approve_flag: req.body.obj[objKeys[i]],
        },
        { where: { id: objKeys[i] } }
      );
    }
    res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
    res.end();
  } catch (err) {
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    res.end();
  }

};




exports.getEmployeeListPdf = async (req, res) => {
  let companyCode = '200';
  empMasterModel.findAll({
    attributes: ['employee_code', 'employee_name', 'join_date', 'branch', 'designation'],
    where: {
      company_code: companyCode
    },
    order: [ 
      ['employee_name', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};