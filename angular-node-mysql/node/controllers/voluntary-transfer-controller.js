const voluntaryTransferModel = require('../models/cor-voluntary-transfer');
const earnDeductModel =  require('../models/Earn-deduct-code');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');



// exports.getVoluntaryTransferList = async (req, res) => {
//   voluntaryTransferModel.findAll({where: {company_code: '200', status: 'RAS'}})
//       .then(getData => {  
//           res.json({isExecuted:true, data: getData});
//           res.end();     
//       })
// };


exports.addVoluntaryTransfer = async (req, res) => {
    console.log(req.body);
    const formData = {
    //   id                  : req.body.id,
      company_code        : req.body.company_code, 
      employee_code       : req.body.employee_code,
      document_date       : req.body.document_date,      
      old_branch          : req.body.old_branch,
      old_division        : req.body.old_division,
      old_department      : req.body.old_department,
      old_unit            : req.body.old_unit,
      old_func            : req.body.old_func,
      new_branch          : req.body.new_branch,
      new_division        : req.body.new_division,
      new_department      : req.body.new_department,
      new_unit            : req.body.new_unit,
      new_func            : req.body.new_func,
      reason              : req.body.reason,
      status              : req.body.status,
      approve_by          : req.body.approve_by,
      approve_date        : req.body.approve_date, 
      group_code          : req.body.group_code,
      insert_by           : req.body.insert_by,
      insert_date         : req.body.insert_date,
      update_by           : req.body.update_by,
      update_date         : req.body.update_date, 
    };
  // ------------------------------------------------------

    console.log(formData);
    voluntaryTransferModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



// -------------------------------------------------------------------
exports.getEmployeeInfo = async (req, res) => {
    const empId = req.params.id;
    empModel.findAll({
        where: {company_code: '200', employee_code: empId}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getEmployeeList = async (req, res) => {
    empModel.findAll({
        where: {company_code: '200'}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getDocumentList = async (req, res) => {
    documentModel.findAll({
        where: {company_code: '200', emp_active: 'Y'}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getDepartment = async (req, res) => {
    let hardCode = req.params.dept.substring(0,2);
    let softCode = req.params.dept.substring(2);

    deptModel.findAll({
        where: {company_code: '200', hard_code: hardCode, soft_code: softCode}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getDivision = async (req, res) => {
    let hardCode = req.params.div.substring(0,2);
    let softCode = req.params.div.substring(2);

    divModel.findAll({
        where: {company_code: '200', hard_code: hardCode, soft_code: softCode}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getDesignation = async (req, res) => {
    let hardCode = req.params.desig.substring(0,2);
    let softCode = req.params.desig.substring(2);
    desigModel.findAll({
        where: {company_code: '200', hard_code: hardCode, soft_code: softCode}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getDesignationList = async (req, res) => {
    desigModel.findAll({
        where: {company_code: '200'}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};


exports.getBranch = async (req, res) => {
    let branchCode = req.params.branch;

    branchModel.findAll({
        where: {company_code: '200', branch_code: branchCode}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.getVoluntaryTransferList = async (req, res) => {
    try{
    // const empId = req.params.id;
    const companyCode = '200';

    let voluntaryData =   
       await  dbConnect.query(`SELECT v.id,
                                    v.employee_code,
                                    v.document_date,
                                    e.employee_name,
                                    v.old_branch,
                                    v.new_branch,
                                    b.branch_name old_br,
                                    c.branch_name new_br,
                                    gg.gradeName new_div,
                                    g.gradeName old_div,
                                    CASE status
                                    WHEN 'RAS' then 'Raised' 
                                    WHEN 'APR' then 'Approved' 
                                    ELSE 'Closed' END status
                                FROM cor_voluntary_transfer v,
                                    cor_employee_master e,
                                    con_com_branchmaster b,
                                    con_com_branchmaster c,
                                    con_grades g,
                                    con_grades gg
                                WHERE   v.company_code = '${companyCode}'
                                    And v.status       = 'RAS'
                                    And v.company_code = e.company_code
                                    AND v.employee_code = e.employee_code
                                    AND v.company_code = b.company_code
                                    AND v.old_branch = b.branch_code
                                    And v.company_code = c.company_code
                                    And v.new_branch = c.branch_code
                                    And v.company_code = g.company_code
                                    And v.old_division = g.gradeCode
                                    And v.company_code = gg.company_code
                                    And v.new_division = gg.gradeCode`,
                                {type: QueryTypes.SELECT});
 
    console.log(voluntaryData);
      res.json({isExecuted:true, data: voluntaryData});
      res.end();
    } catch(err) {
        console.log(err);
    }
};


exports.getVoluntaryTransferById = async (req, res) => {
  let editId = req.params.id;
  
  voluntaryTransferModel.findOne(
      { where: {id: editId}}
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


exports.updateVoluntaryTransfer = async (req, res) => {
    let updatedId = req.params.id;

    voluntaryTransferModel.update({
      id                  : req.body.id,
      company_code        : req.body.company_code, 
      employee_code       : req.body.employee_code,
      document_date       : req.body.document_date,      
      old_branch          : req.body.old_branch,
      old_division        : req.body.old_division,
      old_department      : req.body.old_department,
      old_unit            : req.body.old_unit,
      old_func            : req.body.old_func,
      new_branch          : req.body.new_branch,
      new_division        : req.body.new_division,
      new_department      : req.body.new_department,
      new_unit            : req.body.new_unit,
      new_func            : req.body.new_func,
      reason              : req.body.reason,
      status              : req.body.status,
      approve_by          : req.body.approve_by,
      approve_date        : req.body.approve_date, 
      group_code          : req.body.group_code,
      update_by           : req.body.update_by,
      update_date         : req.body.update_date, 
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


exports.deleteVoluntaryTransfer = async (req, res) => {
    let deleteId = req.params.id;
    
    voluntaryTransferModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Not deleted for : "+ deleteId});
        res.end();
    });
};


exports.getDeductionCode = async (req, res) => {
  earnDeductModel.findAll({
    attributes: [['soft_code', 'code'], 'description'],
    where: {hard_code: 'ER'}
  })
  .then(getData => { 
      res.json({isExecuted:true, data: getData});
      res.end();     
  })
};
