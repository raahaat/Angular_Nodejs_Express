const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const documentModel = require('../models/con-doc-type-setup');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const loanAdvanceModel = require('../models/loan-advance-modal');
const codeMasterModel = require('../models/con-code-master');
const empMasterModel = require('../models/cor-employee-master');
const earnDeductModel = require('../models/earning-head-setup-model');


const compCode = '200';

exports.addLoanAdvances = async (req, res) => {
try {
    const loanData = {
        company_code:               req.body.company_code,
        employee_code:              req.body.employee_code,
        document_no:                req.body.document_no,
        sub_type:                   req.body.sub_type,
        document_type:              req.body.document_type,
        document_date:              req.body.document_date,
        loan_advance_code:          req.body.loan_advance_code,
        deduction_link_code:        req.body.deduction_link_code,
        loan_amount:                req.body.loan_amount,
        loan_final_amount:          req.body.loan_final_amount,
        currency_code:              req.body.currency_code,
        loan_reference:             req.body.loan_reference,
        start_date:                 req.body.start_date,
        end_date:                   req.body.end_date,
        no_of_installment:          req.body.no_of_installment,
        installment_amount:         req.body.installment_amount,
        installment_final_amount:   req.body.installment_final_amount,
        paid_amount:                req.body.paid_amount,
        paid_final_amount:          req.body.paid_final_amount,
        last_installment:           req.body.last_installment,
        last_recovery_date:         req.body.last_recovery_date,
        paid_installment:           req.body.paid_installment,
        branch_code:                req.body.branch_code,
        account_code:               req.body.account_code,
        loan_waive:                 req.body.loan_waive,
        close_reson:                req.body.close_reson,
        paid_manual_amount:         req.body.paid_manual_amount,
        waived_flag:                req.body.waived_flag,
        process_flag:               req.body.process_flag,
        total_waived:               req.body.total_waived,
        waived_amount:              req.body.waived_amount,
        lender:                     req.body.lender,
        account_type:               req.body.account_type,
        principle_amount:           req.body.principle_amount,
        grace_period:               req.body.grace_period,
        insert_by:                  req.body.insert_by,
        insert_date:                req.body.insert_date
    }

    await loanAdvanceModel.create(loanData)
          .then((data) => {
            return res.json({isExecuted: true, message:'Successfully Done!'});
          }).catch((err) => {
            console.log('Add Loan Data Error: ', err);
            return res.send(err);
        })
    } catch (error) {
        console.log('Error: ' + error);
    }
}


exports.getEmpInforLoan = async (req, res) => {
    id = req.params.id;
    console.log("id -" ,id);
    empMasterModel.belongsTo(codeMasterModel,{ foreignKey:'category',targetKey:'code'});
    
    await empMasterModel.findOne({attributes:['employee_code','join_date','department'],where:{employee_code:id},include:[{model: codeMasterModel, attributes:['description']}]})
    .then(getData  =>{
      console.log(getData);
        all_data ={
            'employee_code':getData.employee_code,
            'joining_date': getData.join_date,
            'department': getData.department,
            'category': getData.con_code_master.description
        };
        console.log("result",all_data);
        res.json({isExecuted:true, data: all_data});
        res.end();
     });
  }


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

exports.getDepartment = async (req, res) => {
    let hardCode = req.params.dept.substring(0,2);
    let softCode = req.params.dept.substring(2);

    deptModel.findAll({
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

exports.getDivision = async (req, res) => {
    let hardCode = req.params.div.substring(0,2);
    let softCode = req.params.div.substring(2);

    divModel.findAll({
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



// exports.getDeductionCode = async (req, res) => {

//     earnDeductModel.findAll({
//         where: {company_code: compCode, hard_code: 'DD'}
//     })
//     .then(getData => { 
//         res.json({isExecuted:true, data: getData});
//         res.end(); 
//     })
//     .catch((err)=> {
//      console.log(err);
//     })   
// };



exports.getDeductionCode = async (req, res) => {
  
    earnDeductModel.findAll({
      attributes: ['headCode', 'headName'],
      where: {
        company_code: compCode,
        headType: 'DD'
      }
    })
    .then(getData => {  
        console.log(getData);
      res.json({isExecuted:true, data: getData});
      res.end();     
    })
  };