const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const codeMasterModel = require('../models/con-code-master');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const assetCostSetupModal = require('../models/asset-cost-setup-modal');
const systemAccessModel = require('../models/system-access-model');
const userTypeModel = require('../models/user-type');





exports.addSystemAccess = async (req, res) => {
  let systemAccess = req.body.times;
  await systemAccessModel.bulkCreate(systemAccess).then((data) => {
      res.json({isExecuted: true, message: "Successfull Inserted"});
      res.end();
  }).catch((err) => {
      res.json({isExecuted: false, message: "Error to insert Data"});
      res.end();
      console.log('Add Cost Error: ', err);
  })
}



exports.updateSystemAccess = async (req, res) => {
  let updatedId = req.params.id;

  systemAccessModel.update({
    id:               req.body.id,
    company_code:     req.body.company_code,
    branch_code:      req.body.branch_code,
    division_code:    req.body.division_code,
    department_code:  req.body.department_code,
    update_by:        req.body.update_by,
    update_date:      req.body.update_date
  }, {where: {id: updatedId}}
  )

  .then((updated)=> {
    res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
    res.end();
  })
  .catch (err => {
    res.json({isExecuted:false, message:"Unknown Error: "+ err});
    res.end();
  })
};

exports.checkDuplicate = async (req, res) => {
  let companyCode = '200';
  let formDataArray = JSON.parse(req.query.formValue);
  let dataCount = formDataArray.length;
  let isDuplicate = false;
  let getDuplicate;

  formDataArray.forEach(async (element, index)=> {
    if (!isDuplicate) {
      getDuplicate =
      await systemAccessModel.findAll({
        where: {
          company_code: companyCode,
          user_code: element.user_code,
          branch_code: element.branch_code,
          division_code: element.division_code,
          department_code: element.department_code
        }
      })
    }
    if (getDuplicate.length > 0) {
      isDuplicate = true;
      return res.json({duplicateCount: 1});
    }

    if (dataCount == (index+1) && isDuplicate == false) {
      return res.json({duplicateCount: 0});
    }
  })
};

exports.checkDuplicateEdit = async (req, res) => {
  let companyCode = '200';
  let formData = JSON.parse(req.query.formValue);

  let getDuplicate =
  await systemAccessModel.findAll({
    where: {
      company_code: companyCode,
      user_code: formData.user_code,
      branch_code: formData.branch_code,
      division_code: formData.division_code,
      department_code: formData.department_code,
      id: {[Op.ne] : formData.id}
    }
  })

  if (getDuplicate.length > 0) {
    return res.json({duplicateCount: 1});
  } else {
    return res.json({duplicateCount: 0});
  }
};


// exports.updateSystemAccess = async (req, res) => {
//   let updatedId = req.params.id;
//   systemAccessModel.findOne({
//    where: {
//     id: { [Op.ne]: updatedId },
//     company_code: req.body.company_code}
//    })
//    .then(data => {
//      if (!data) {
//        console.log('Hell0!!!!',updatedId);
//       systemAccessModel.update(
//         { branch_code:      req.body.branch_code,
//           division_code:    req.body.division_code,
//           department_code:  req.body.department_code,
//           update_by:        req.body.update_by,
//           update_date:      req.body.update_date},
//           {where: {id: updatedId}}
//         )
//         .then(()=> {
//           res.json({isExecuted:true, message:"Successfully Updated Data."});
//           res.end();
//         })
//         .catch (err => {
//           res.json({isExecuted:false, message:"Unknown Error: "+ err});
//           res.end();
//         })
//      } else {
//        res.json({isExecuted:false, message:"Data already exists in table."});
//        res.end();
//      }
//    })
//  };




// exports.getSystemAccessList = async (req, res) => {
//   let companyCode = '200';
  
//   systemAccessModel.findAll( { 
//     where: {
//         company_code: companyCode
//       }
//     }
//   )
//   .then(editData => {
//     console.log(editData);
//     res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
//     res.end();
//     })
//   .catch(err => {
//     res.json({isExecuted:false, message: "Error to get data."});
//     res.end();
//   });
// };



exports.getSystemAccessList = async (req, res) => {
  try{
    // findId = req.params.id;
    // console.log("id -----" ,findId);
  const companyCode = '200';

  let sysAccessData =   
     await  dbConnect.query(`SELECT s.id,s.user_code, u.employee_name, s.branch_code,s.division_code,s.department_code, b.branch_name, g.gradeName, d.description
                              FROM system_access s, user_type u, (Select '00000' branch_code, 'All Branch' branch_name, '200' company_code
                              From dual
                             Union All
                            Select '' branch_code, 'Null' branch_name, '200' company_code
                              From dual
                             Union All
                            Select branch_code, branch_name, company_code
                              from con_com_branchmaster
                             Where company_code = '${companyCode}') b, 
                           (Select '00000' gradeCode, 'All Division' gradeName, '200' company_code
                               From dual
                             Union All
                             Select '' gradeCode, 'Null' gradeName, '200' company_code
                               From dual
                             Union All
                             Select gradeCode, gradeName, company_code
                               from con_grades
                              Where company_code = '${companyCode}') g, 
                          (Select '00000' dept_code, 'All Department' description, '200' company_code
                             From dual
                           Union All
                           Select '' dept_code, '' description, '200' company_code
                             From dual
                           Union All
                           Select dept_code, description, company_code
                             from con_department
                            Where company_code = '${companyCode}') d
                        WHERE s.company_code = '${companyCode}'
                          And s.company_code = u.company_code
                          And s.user_code = u.user_id
                          And s.company_code = b.company_code
                          And s.branch_code = b.branch_code
                          And s.company_code = g.company_code
                          And s.division_code = g.gradeCode
                          And s.company_code = d.company_code
                          And s.department_code = d.dept_code
                          order by user_code, branch_code`,
                              {type: QueryTypes.SELECT});

    res.json({isExecuted:true, data: sysAccessData});
    res.end();
  } catch(err) {
      console.log(err);
  }
};



exports.getSysAccSingleList = async (req, res) => {
  try{
  const companyCode = '200';
  let empCde = req.params.id;

  let sysAccessData =   
     await  dbConnect.query(`SELECT s.id,s.user_code, u.employee_name, s.branch_code,s.division_code,s.department_code, b.branch_name, g.gradeName, d.description
                      FROM system_access s, user_type u, (Select '00000' branch_code, 'All Branch' branch_name, '200' company_code
                               From dual
                             Union All
                             Select '' branch_code, 'Null' branch_name, '200' company_code
                               From dual
                             Union All
                             Select branch_code, branch_name, company_code
                               from con_com_branchmaster
                              Where company_code = '${companyCode}') b, 
                           (Select '00000' gradeCode, 'All Division' gradeName, '200' company_code
                               From dual
                             Union All
                             Select '' gradeCode, 'Null' gradeName, '200' company_code
                               From dual
                             Union All
                             Select gradeCode, gradeName, company_code
                               from con_grades
                              Where company_code = '${companyCode}') g, 
                          (Select '00000' dept_code, 'All Department' description, '200' company_code
                             From dual
                           Union All
                           Select '' dept_code, 'Null' description, '200' company_code
                             From dual
                           Union All
                           Select dept_code, description, company_code
                             from con_department
                            Where company_code = '${companyCode}') d
                        WHERE s.company_code = '${companyCode}'
                          AND s.user_code = '${empCde}'
                          And s.company_code = u.company_code
                          And s.user_code = u.user_id
                          And s.company_code = b.company_code
                          And s.branch_code = b.branch_code
                          And s.company_code = g.company_code
                          And s.division_code = g.gradeCode
                          And s.company_code = d.company_code
                          And s.department_code = d.dept_code
                          order by user_code, branch_code`,
                              {type: QueryTypes.SELECT});

    res.json({isExecuted:true, data: sysAccessData});
    res.end();
  } catch(err) {
      console.log(err);
  }
};


exports.getSysAccSingleEdit = async (req, res) => {
  let companyCode = '200';
  let editId = req.params.id;
  
  systemAccessModel.findAll( { 
    where: {
        company_code: companyCode,
        id: editId
      }
    }
  )
  .then(editData => {
    res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};


exports.getUserTypeList = async (req, res) => {
  let companyCode = '200';
  
  userTypeModel.findAll( { 
    where: {
        company_code: companyCode
      }
    }
  )
  .then(editData => {
    res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};



exports.getSingleUserType = async (req, res) => {
  try {
   let userId = req.params.id;
   let userType = 
     await dbConnect.query(`SELECT a.id, a.company_code, a.user_id, a.user_type, a.employee_code, 
                                  a.employee_name, a.email, a.user_status, a.insert_by, a.insert_date, 
                                  a.update_by, a.update_date, b.branch emp_branch_code, c.branch_name emp_branch_name , 
                                        c.head_office, b.division emp_division, b.department emp_department 
                              FROM user_type a , cor_employee_master b, con_com_branchmaster c
                              WHERE a.company_code = '200'
                                And a.company_code = b.company_code
                                And b.branch = c.branch_code
                                And a.employee_code = b.employee_code
                                And a.employee_code = '${userId}' `, {type: QueryTypes.SELECT, plain: true})
                             
      return res.send(userType);
   } catch (err) {
     return res.json({ isExecuted: false, message: "Unknown Error: " + err });
   }
 };



exports.deleteSysAccess = async (req, res) => {
  let deleteId = req.params.id;

  systemAccessModel.destroy(
    {where:{id: deleteId}}
  )
  .then(deletedData => {
    res.json({isExecuted:true,data: deletedData});
    res.end();
  })
  .catch(err => {
    res.json({isExecuted:false, message: "Data not deleted for :"+ deleteId});
    res.end();
  });
};

// -------------------End---------------------