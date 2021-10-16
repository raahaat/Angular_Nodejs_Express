const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const empGrowthModel = require('../models/employee-growth');
const documentModel = require('../models/con-doc-type-setup');
const empMasterModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const transferOrder = require('../models/cor-transfer-order');
const branchModel = require('../models/branch-master-setup');
const salaryDesigModel = require('../models/con-desig-salary-setup');
const growthDetailsModel = require('../models/employee-growth-details');
const generateDocPath = require('./test-docuemnt-master-controller')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');



const compCode = '200';


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
        company_code        : fromFormService['company_code'] ,
        employee_code       : fromFormService['employee_code'],
        document_type       : docType,
        document_sub_type   : fromFormService['sub_type'],     
        document_number     : documentNumber ,     
        document_date       : fromFormService['document_date'] ,  
        effective_date      : fromFormService['effective_date'], 
        release_date        : fromFormService['release_date'],  
        new_grade           : fromFormService['employee_division'] ,  
        new_designation     : fromFormService['employee_designation'],   
        new_branch          : fromFormService['employee_branch'], 
        new_division        : fromFormService['employee_department'] , 
        reference           : fromFormService['reference'], 
        insert_by           : fromFormService['insert_by'],  
        insert_date         : fromFormService['insert_date'] 
    };

    await empGrowthModel.create(formData)
    .then(()=> {
        for (let i = 0; i < fromSalaryService.length; i++) {
            const growDetails = {     
                company_code        : fromFormService['company_code'] ,
                employee_code       : fromFormService['employee_code'],
                document_type       : docType,
                document_sub_type   : fromFormService['sub_type'],     
                document_number     : documentNumber ,     
                document_date       : fromFormService['document_date'] ,  
                effective_date      : fromFormService['effective_date'], 
                earn_deduct_code    : fromSalaryService[i]['earning_code'],  
                old_amount          : fromSalaryService[i]['old_amount'] , 
                new_amount          : fromSalaryService[i]['new_amount'] ,     
                insert_by           : fromFormService['insert_by'],  
                insert_date         : fromFormService['insert_date'] 
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

// exports.getEmployeeInfo = async (req, res) => {
//     const empId = req.params.id;
//     empMasterModel.findAll({
//         where: {company_code: compCode, employee_code: empId}
//     })
//     .then(getData => { 
//         res.json({isExecuted:true, data: getData});
//         res.end(); 
//     })
//     .catch((err)=> {
//      console.log(err);
//     })   
// };

exports.getEmployeeInfo = async (req, res) => {
    const empId = req.params.id;
    empMasterModel.belongsTo(transferOrder,{ foreignKey:'employee_code',targetKey:'employee_code'});
    await empMasterModel.findOne({attributes:['employee_code', 'employee_name', 'branch','division','department','designation'],
                                 include:[{model: transferOrder, attributes:['id','employee_code','new_branch','new_division','new_department'],where:{company_code: compCode, employee_code: empId, pystatus:'APR'}}]})

                .then(getData  =>{
console.log('hello111111111111S', getData);
                    all_data ={
                        'employee_name':getData.employee_name,
                        'employee_code':getData.employee_code,
                        'division': getData.division,
                        'branch': getData.branch,
                        'designation': getData.designation,
                        'department': getData.department,
                        'new_branch': getData.cor_transfer.new_branch,
                        'new_division': getData.cor_transfer.new_division,
                        'new_department': getData.cor_transfer.new_department,
                        'id': getData.cor_transfer.id
                    };
                    console.log('Bangladesh--!!!!!', all_data);
                    res.json({isExecuted:true, data: all_data});
                    res.end();
                });
        };




exports.getEmployeeList = async (req, res) => {
    empMasterModel.belongsTo(transferOrder,{ foreignKey:'employee_code',targetKey:'employee_code'});
    await empMasterModel.findAll({attributes:['employee_code', 'employee_name'],
                                 include:[{model: transferOrder, attributes:['employee_code'],where:{company_code: compCode,pystatus:'APR'}}]})

                .then(getData  =>{
                    res.json({isExecuted:true, data: getData});
                    res.end();
                });
        };



exports.getDocumentList = async (req, res) => {
    documentModel.findAll({
        where: {
            company_code: compCode, 
            doc_type: 'TF',
            doc_sub_type: '1',
            valid_flag: 'Y'
        }
    })
    .then(getData => { 
        // getSalaryByEmployee('200', '003797');
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};

exports.departmentList = async (req, res) => {

    deptModel.findAll({
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

exports.divisionList = async (req, res) => {

    divModel.findAll({
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
   salaryDesigModel.findAll({
        where: {company_code: compCode, designation: designationCode}
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })   
};



exports.addGrowthNdtl = async (req, res) => {
    try {
        let employeeCode = req.body.employee_code;
        let documentNumber;
        let docType = req.body.document_type;
        let effDate = req.res.effective_date;
        let docDate = req.res.document_date;
        let updatedId = req.body.id;

    
        try {
            let docFunction = generateDocPath.generateDocumentNo(docType);
           await docFunction.then(docNumber => {
                documentNumber = docNumber;
            });
        } catch {
            return res.json({isExecuted:false, message : 'Error to generate document number!!!'});
        }

        let growthDetails = 
          await dbConnect.query(`SELECT a.company_code,
                                        a.employee_code,
                                        a.document_type,
                                        a.document_sub_type,
                                        a.document_number,
                                        a.document_date,
                                        a.effective_date,
                                        a.earn_deduct_code,
                                        a.old_amount,
                                        a.new_amount,
                                        a.dependsOnAttendance,
                                        a.process_flag
                                FROM employee_growth_details a,(SELECT Max(b.effective_date) effective_date,
                                                                        b.company_code,
                                                                        b.employee_code,
                                                                        Max(b.document_date) document_date,
                                                                        Max(b.insert_date) insert_date
                                                                    FROM employee_growth_details b
                                                                   WHERE b.company_code = '${compCode}' 
                                                                     AND b.employee_code = '${employeeCode}'
                                                                GROUP BY b.company_code, b.employee_code) c
                                WHERE   a.company_code = '${compCode}'
                                    AND a.effective_date = c.effective_date
                                    AND a.document_date = c.document_date
                                    AND a.insert_date = c.insert_date
                                    AND a.employee_code = '${employeeCode}'`
                                    ,{type: QueryTypes.SELECT})

        let results = 
        await dbConnect.query(`SELECT employee_code, document_date, new_basic, new_grade, new_designation, new_category, new_cycle, new_branch, new_division, new_unit,
                                       new_location, new_salary_type, new_employee_type,  increment_due_date, process_flag, special_flag, due_date, publish
                                   FROM employee_growth a
                                   WHERE     a.company_code = '${compCode}'
                                       AND a.employee_code = '${employeeCode}'
                                       AND a.effective_date =
                                           (SELECT max(effective_date) AS max
                                               FROM employee_growth b
                                               WHERE   b.company_code = '${compCode}'
                                                   AND b.employee_code = '${employeeCode}')
                                   AND ifnull(a.insert_date,sysdate()) =
                                           (SELECT max(ifnull(insert_date,sysdate())) AS max
                                               FROM employee_growth b
                                              WHERE b.company_code = '${compCode}'
                                                AND b.employee_code = '${employeeCode}')`
                                                ,{type: QueryTypes.SELECT}) 
          if (results) {
              console.log('Result---------!!!!!!!!!.........',results);
           const formData = {
               company_code        : compCode,
               employee_code       : req.body.employee_code,
               document_type       : 'TF',
               document_sub_type   : 1,     
               document_number     : documentNumber ,     
               document_date       : req.body.document_date,  
               effective_date      : req.body.effective_date, 
               release_date        : req.body.release_date, 
               reference           : req.body.reference,
               old_basic           : results[0].new_basic,
               new_basic           : results[0].new_basic,
               new_grade           : req.body.employee_division, 
               old_grade           : results[0].new_grade,  
               new_designation     : req.body.employee_designation, 
               old_designation     : results[0].new_designation,
               new_category        : results[0].new_category,
               old_category        : results[0].new_category,
               new_cycle           : results[0].new_cycle,
               old_cycle           : results[0].new_cycle,   
               new_branch          : req.body.employee_branch, 
               old_branch          : results[0].new_branch,
               new_division        : req.body.employee_department,
               old_division        : results[0].new_division,
               new_unit            : results[0].new_unit,
               old_unit            : results[0].new_unit,
               new_location        : results[0].new_location,
               old_location        : results[0].new_location,
               new_salary_type     : results[0].new_salary_type,
               old_salary_type     : results[0].new_salary_type,
               reference           : req.body.reference,
               new_employee_type   : results[0].new_employee_type,
               old_employee_type   : results[0].new_employee_type,
               arrear_amount       : null,
               arrear_date         : null,
               increment_due_date  : req.body.increment_due_date,
               processed           : null,
               process_flag        : null,
               special_flag        : null,
               due_date            : null,
               arrear_month        : null,
               arrear_days         : null,
               no_of_increment     : null,
               increment_percent   : null,
               publish             : null,
               approve_flag        : null,
               approve_by          : null,
               approve_date        : null, 
               insert_by           : req.body.insert_by,  
               insert_date         : req.body.insert_date, 
           };
        //    console.log(formData);
        //    console.log(growthDetails);
           empGrowthModel.create(formData)
           .then(()=> {
            for (let i = 0; i < growthDetails.length; i++) {
                const growDetails = {     
                    company_code        : growthDetails[i]['company_code'] ,
                    employee_code       : growthDetails[i]['employee_code'],
                    document_type       : docType,
                    document_sub_type   : 1,     
                    document_number     : documentNumber ,     
                    document_date       : docDate ,  
                    effective_date      : effDate, 
                    earn_deduct_code    : growthDetails[i]['earn_deduct_code'],  
                    old_amount          : growthDetails[i]['old_amount'], 
                    new_amount          : growthDetails[i]['new_amount'],  
                    dependsOnAttendance : growthDetails[i]['dependsOnAttendance'],   
                    insert_by           :'sharip',  
                    insert_date         : new Date()
                };
                growthDetailsModel.create(growDetails)
                .catch ((err)=> {
                 console.log(err);
                 generateDocPath.reverseDocumentNo(docType);                 
                })
            }
        })  
        
            transferOrder.update({
                id                  : req.body.id,
                pystatus            : 'CLO',
                release_flag        : 'Y',
                tr_reference        : req.body.tr_reference,
                update_by           : req.body.update_by,
                update_date         : req.body.update_date, 
            }, {where: {id: updatedId}}
                )
            
                .then((updated)=> {
                res.json({isExecuted:true, data: updated, message:"Successfully Updated cor_transfer."});
                res.end();
                })
                .catch (err => {
                res.json({isExecuted:false, message:"Unknown Error: "+ err});
                res.end();
                });
        

      }
     return res.json({isExecuted: true, message: 'Data inserted successfully!'})
    } catch (err) {
        console.log(err);
        return res.json({isExecuted: false, message: 'Error to insert data!'})
    } 
}


async function getSalaryByEmployee(companyCode, employeeCode) {
   //let empCode = req.params.employee_code;
   //Sequelize.fn('max', Sequelize.col('effective_date'))
   console.log(employeeCode);
   let maxDate = 
    await empGrowthModel.max('effective_date', 
        {
        where: {
            company_code: companyCode,
            employee_code: employeeCode
        }
        });

   await empGrowthModel.findAll({
        where: {
            company_code: companyCode, //compCode, 
            employee_code: employeeCode, // empCode,
            effective_date: maxDate
        }
      //  group: ['employee_code']
    })
    .then(getData => { 
      //  res.json({isExecuted:true, data: getData});
      //  res.end(); 
      console.log(getData);
      return getData;
    })
    .catch((err)=> {
     console.log(err);
    })   
};