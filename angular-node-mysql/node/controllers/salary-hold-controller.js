const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const documentModel = require('../models/con-doc-type-setup');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const salaryHoldModel = require('../models/salary-hold-modal');

const compCode = '200';

// exports.addSalaryHold() = async (req, res) => {
// try {
//     const salaryHold = {
//         company_code:       req.body.company_code,
//         employee_code:      req.body.employee_code,
//         effective_date:     req.body.effective_date, 
//         expire_date:        req.body.expire_date, 
//         status_flag:        req.body.status_flag, 
//         insert_by:          req.body.insert_by,
//         insert_date:        req.body.insert_date
//     }

//     await salaryHoldModel.create(salaryHold)
//           .then((data) => {
//             return res.json({isExecuted: true, message:'Successfully Done!'});
//           }).catch((err) => {
//             console.log('Add Salary Hold Data Error: ', err);
//             return res.send(err);
//         })
//     } catch (error) {
//         console.log('Error: ' + error);
//     }
// }

exports.getSalaryHoldList = async (req, res) => {
    salaryHoldModel.findAll({
        where: {company_code: compCode}
    })
        .then(getData => {  
            res.json({isExecuted:true, data: getData});
            res.end();     
        })
  };


exports.addSalaryHold = async (req, res) => {
    let compCode = '200';
    try {
       const objKeys = Object.keys(req.body.obj);
       for (let i = 0; i < objKeys.length; i++) {
          const formData = {     
               company_code    : req.body.obj[objKeys[i]].company_code ,
               employee_code   : req.body.obj[objKeys[i]].employee_code,
               effective_date  : req.body.obj[objKeys[i]].effective_date,
               expire_date     : req.body.obj[objKeys[i]].expire_date,
               status_flag     : req.body.obj[objKeys[i]].status_flag,
               insert_by       : req.body.obj[objKeys[i]].insert_by ,  
               insert_date     : req.body.obj[objKeys[i]].insert_date 
           };
         await salaryHoldModel.create(formData);
         await empModel.update(
            {process_flag      : req.body.obj[objKeys[i]].process_flag,
             update_by         : req.body.obj[objKeys[i]].insert_by,
             update_date       : req.body.obj[objKeys[i]].insert_date},
              {where: {
                company_code : compCode, 
                employee_code: req.body.obj[objKeys[i]].employee_code}
              }
            ).catch (err => {
               console.log(err);
            })
       }
       res.json({isExecuted:true, message:"Successfully inserted!"});
       res.end();
     } catch (err) {
       res.json({ isExecuted: false, message: "Unknown Error: " + err });
       res.end();
     }
   };


   exports.getSalaryHoldById = async (req, res) => {
    let editId = req.params.id;
    
   await salaryHoldModel.findOne(
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


exports.getEmployeeInfo = async (req, res) => {
    const empId = req.params.id;
    empModel.findAll({
        where: {company_code: compCode, employee_code: empId}
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
        where: {company_code: compCode}
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
        where: {
            company_code: compCode, 
            doc_type: {[Op.in]:['AD']},
            emp_active: 'Y'}
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
        where: {company_code: compCode, hard_code: hardCode, soft_code: softCode}
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
        where: {company_code: compCode}
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
        where: {company_code: compCode, branch_code: branchCode}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};