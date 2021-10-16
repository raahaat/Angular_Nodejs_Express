const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const moment = require ('moment');
const empGrowthModel = require('../models/employee-growth');
const documentModel = require('../models/con-doc-type-setup');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const salaryDesigModel = require('../models/con-desig-salary-setup');
const growthDetailsModel = require('../models/employee-growth-details');
const generateDocPath = require('../controllers/test-docuemnt-master-controller');
const empStatusModel = require('../models/empstatus');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');
const compCode = '200';
const contractualEmpType = 'TY002';

exports.addPromotionCf = async (req, res) => {

    let fromFormService = req.body[0];
    let fromSalaryService = req.body[1];
    let documentNumber;
    let docType = fromFormService['document_type'];

    try {
        let docFunction = generateDocPath.generateDocumentNo(docType);
       await docFunction.then(docNumber => {
            documentNumber = docNumber;
        });
    } catch {
        return res.json({isExecuted:false, message : 'Error to generate document number!!!'});
    }     
    
    try {

    if (documentNumber) {
    const formData = {     
        company_code : fromFormService['company_code'] ,
        employee_code  : fromFormService['employee_code'],
        document_type  : docType,
        document_sub_type : fromFormService['sub_type'],     
        document_number :  documentNumber ,     
        document_date : fromFormService['document_date'] ,  
        effective_date : fromFormService['effective_date'], 
        release_date:  fromFormService['release_date'],  
        new_grade: fromFormService['employee_division'] ,  
        new_designation: fromFormService['employee_designation'],   
        new_branch:  fromFormService['employee_branch'], 
        new_division: fromFormService['employee_department'] , 
        reference: fromFormService['reference'], 
        insert_by : fromFormService['insert_by'],  
        insert_date : fromFormService['insert_date'] 
    };

    await empGrowthModel.create(formData)
    .then(()=> {
        for (let i = 0; i < fromSalaryService.length; i++) {
            const growDetails = {     
                company_code : fromFormService['company_code'] ,
                employee_code  : fromFormService['employee_code'],
                document_type  : docType,
                document_sub_type : fromFormService['sub_type'],     
                document_number :  documentNumber ,     
                document_date : fromFormService['document_date'] ,  
                effective_date : fromFormService['effective_date'], 
                earn_deduct_code:  fromSalaryService[i]['earning_code'],  
                old_amount: fromSalaryService[i]['old_amount'] , 
                new_amount: fromSalaryService[i]['new_amount'] ,     
                insert_by : fromFormService['insert_by'],  
                insert_date : fromFormService['insert_date'] 
            };
            growthDetailsModel.create(growDetails)
            .catch ((err)=> {
             console.log(err);
             generateDocPath.reverseDocumentNo(docType);
             return res.json({isExecuted:false, message : 'Error to Insert Data into Employee Growth Details!!!'});
            })
        }
        return res.json({isExecuted:true, message : 'Successfully inserted.'});
    }).catch((err)=> {
        console.log(err);
        generateDocPath.reverseDocumentNo(docType);
        return res.json({isExecuted:false, message : 'Error to Insert Data into Employee Growth!!!'});
    })
  } else {
    generateDocPath.reverseDocumentNo(docType);
    return res.json({isExecuted:false, message : 'Error to Insert Data into Employee Growth!!!'});
  }
 } catch {
    generateDocPath.reverseDocumentNo(docType);
    return res.json({isExecuted:false, message : 'Error to Insert Data into Table!!!'});
 }
};

exports.getEmployeeInfo = async (req, res) => {
    const empId = req.params.id;
    const companyCode = '200';

    if (empId) {
        let empInformation =   
        await  dbConnect.query(`SELECT a.id, a.company_code, a.employee_code, a.employee_name,
                            (Select designationName From con_designations where company_code = a.company_code 
                                and designationCode = a.designation) designation_name,
                            (Select branch_name From con_com_branchmaster 
                                where company_code = a.company_code and branch_code = a.branch) branch_name,
                            (Select description From con_grades 
                                where company_code = a.company_code and gradeCode = a.division) division_name,
                            (Select description From con_department 
                                where company_code = a.company_code and dept_code = a.department) department_name,
                                a.designation, a.branch, a.division, a.department, a.category      
                                FROM cor_employee_master a, ph_empstatus b
                                WHERE a.company_code = '${companyCode}'
                                AND a.company_code = b.COMPCDE
                                AND a.emp_status = b.HEADCODE
                                AND a.emp_type = '${contractualEmpType}'
                                AND b.DOPPRO = 'Y' 
                                AND a.employee_code = '${empId}'`,
                        {type: QueryTypes.SELECT, plain: true});

        await empModel.findAll({
            where: {
                company_code: compCode, 
                employee_code: empId
            }
        })
        .then(getData => {                                        
        return res.json({isExecuted: true, data: getData, info: empInformation});
        })
        .catch((err)=> {
        console.log(err);
        return res.json({isExecuted: false, message: 'Error to get data for this employee ID'});
        })
    } else {
        return res.json({isExecuted: false, message: 'Error to get data for this employee ID'});
    }        
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

exports.getContractualEmpList = async (req, res) => {
    try {
        let searchData = req.params.data;
        let showLimit = 100;
        let statusList = [];

        if (searchData == 'blankfield') {
            searchData = '';
            showLimit = 500;
        }

        let activeStatusList = await empStatusModel.findAll({
            attributes: ['HEADCODE'],
            where: {
                DOPPRO: 'Y'
            }
        })

    activeStatusList.forEach(element=> {
        statusList.push(element.dataValues.HEADCODE);
    })

    let getData =
    await empModel.findAll({
            attributes: ['employee_code','employee_name'],
            where: {
                company_code: compCode,
                emp_type : contractualEmpType,
                emp_status : {
                    [Op.in]: [statusList]
                },
                [Op.or]: {
                    employee_code: {[Op.like]: `%${searchData}%`},
                    employee_name: {[Op.like]: `%${searchData}%`},
                }                
            },
            limit: showLimit,
            order: [
                ['employee_code']
            ]
        })
        
    return res.json({isExecuted:true, data: getData});

    } catch (err) {
    console.log(err);
    return res.json({isExecuted:false, message: 'Error to get data'});
    } 
}

exports.getDocumentList = async (req, res) => {
    documentModel.findAll({
        where: {
            company_code: compCode, 
            doc_type: {[Op.in]:['PR','IN','CF','NP']},
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

exports.getSalaryByDesignation = async (req, res) => {
   let designationCode = req.params.designation;
   console.log(designationCode);
   let maxDateByDesignation = 
    await salaryDesigModel.max('effective_date', 
            { where: { 
                company_code: compCode,
                designation: designationCode
            } 
            })
   maxDateByDesignation = moment(maxDateByDesignation).format('YYYY-MM-DD');
   await salaryDesigModel.findAll({
        where: {
            company_code: compCode, 
            designation: designationCode,
            effective_date: maxDateByDesignation
        }
    })
    .then(getData => { 
        return res.json({isExecuted:true, data: getData});
    })
    .catch((err)=> {
     console.log(err);
    })   
};