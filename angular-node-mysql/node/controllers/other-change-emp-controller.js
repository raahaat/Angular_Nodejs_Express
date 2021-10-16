const empGrowthModel = require('../models/employee-growth');
const documentModel = require('../models/con-doc-type-setup');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const generateDocPath = require('./test-docuemnt-master-controller');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');
const dbConnect = require('../database/db');

exports.addOtherChangeEmp = async (req, res) => {
    console.log(req.body);
    console.log(req.body.document_type);

    let myDocumentType = req.body.document_type;

    let documentNumber;
    let updateStatus = req.body.status_change;
    let empCode = req.body.employee_code;
    let docType = req.body.document_type;

    try {
        let docFunction = generateDocPath.generateDocumentNo(docType);
       await docFunction.then(docNumber => {
            documentNumber = docNumber;
        });
    } catch {
        return res.json({isExecuted:false, message : 'Error to generate document number!!!'});
    }

    try {
        const formData = {     
            company_code : req.body.company_code ,
            employee_code  : req.body.employee_code,
            document_type  : req.body.document_type,
            document_sub_type : req.body.sub_type,     
            document_number :  documentNumber,     
            document_date : req.body.document_date ,  
            effective_date : req.body.effective_date ,  
            release_date:  req.body.release_date,  
            new_grade: req.body.employee_division ,  
            new_designation: req.body.employee_designation,   
            new_branch:  req.body.employee_branch, 
            new_division: req.body.employee_department , 
            reference: req.body.reference, 
            insert_by : req.body.insert_by ,  
            insert_date : req.body.insert_date 
        };
    
        await empGrowthModel.create(formData)
        await empModel.update(
             {emp_status: updateStatus},
               {where: {employee_code: empCode}}
             )
        return res.json({isExecuted:true, message : 'Successfully inserted.'}); 
    } catch (err) {
      generateDocPath.reverseDocumentNo(docType);
      console.log(err);
      return res.json({isExecuted:false, message : 'Error to Insert Data!!!'});
    }
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
        attributes: ['doc_type','doc_desc', 'change_type','emp_active','emp_status'],
        where: {
            company_code: '200', 
            emp_active: 'N',
            doc_sub_type: 1}
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
    console.log(req.params.designation);
    console.log(req.params.employeeID);

    console.log(req.query.branch);
    console.log(req.query.desigFrom);


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