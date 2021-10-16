const branchModel = require('../models/branch-master-setup');
const codeMasterModel = require('../models/con-code-master');
const divModel = require('../models/emp-grade-setup-model');
const departmentModel = require('../models/con-department');
const docMaster = require('../models/test-document-master');
const docTypeMaster = require('../models/con-doc-type-setup');
const examModel  = require('../models/exam-setup-model');
const earnDeductModel = require('../models/earning-head-setup-model'); 
const payCycleModel = require('../models/pay-cycle-setup-model'); 
const designationModel = require('../models/designation-setup-model'); 
const empmasModel = require('../models/cor-employee-master');
const leaveModel = require('../models/con-cor-leave-master');
const otherDesigModel = require('../models/other-desig-setup-model');
const companyModel = require('../models/con-company-list');
const eduLevelModel = require('../models/con-com-edu-level');
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const { Op } = require("sequelize");
const companyCode = '200';
const leaveTypeModel = require('../models/con-leave-type');
const empStatusModel = require('../models/empstatus');
const gradeModel = require('../models/emp-grade-setup-model');

exports.getPayCycleList = async (req, res) => {
  let compCode = '200'
  await payCycleModel.findAll({
    where : {company_code: compCode, monthStatus: 'N'}
  })
  .then((cycle) => {
      res.send(cycle);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getSinglePayCycle = async (req, res) => {
  console.log("getit");
  let compCode = '200'
  await payCycleModel.findAll({
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('currentMonth')), 'currentMonth'],'currentYear'],
    where : {company_code: compCode, monthStatus: 'N'}
  })
  .then((cycle) => {
      res.send(cycle);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getDocumentTypeList = async (req, res) => {
  await docMaster.findAll()
  .then((doc) => {
      res.send(doc);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getDocTypeList = async (req, res) => {
  await docTypeMaster.findAll({
    attributes: ['doc_type','doc_desc','emp_active','emp_status'],
    where: {
      company_code: '200',
      doc_sub_type: 1,
      valid_flag: 'Y'
    }
   }
  )
  .then((doc) => {
      res.send(doc);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getEarnDeductCodeList = async (req, res) => {
  await earnDeductModel.findAll({
    attributes: [
      'headCode', 
      'headName', 
      'paymentFrequency', 
      'dependsOnAttendance', 
      'fixedVariable', 
      'printOnPayslip'
    ],
    where: {company_code: companyCode},
    order: [
      ['serialNumber', 'ASC'], ['headName', 'ASC']
  ]
  })
  .then((code) => {
      res.send(code);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getDesignationList = async (req, res) => {
  await designationModel.findAll({
    order: [
      ['designationRank', 'ASC']
  ]
  })
  .then((code) => {
      res.send(code);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getDesignationDescList = async (req, res) => {
  await designationModel.findAll({
    order: [
      ['designationRank', 'DESC']
  ]
  })
  .then((code) => {
      res.send(code);
  }).catch((err) => {
      res.send(err);
  })
};

exports.getCodeDescription = async (req, res) => {
  let companyCode = '200';
  let getCode = req.params.code;
  
  codeMasterModel.findOne({ 
    attributes: ['description'],
    where: {
      company_code: companyCode,
      code: getCode}
  })
  .then(getData => {
    res.json({isExecuted:true, data: getData});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};


exports.getEmployeeLovList = async (req, res) => {
  let companyCode = '200';

  await empmasModel.findAll({
    attributes: ['employee_code', 'employee_name'],
    where: {
      company_code: companyCode
    },
    order: [ 
      ['employee_name', 'ASC'],
    ]
  })
  .then(emp => { 
    res.json({isExecuted: true, data: emp});   
  }).catch((err) => {
    res.send(err);
  })
};



exports.getActiveEmployeeLovList = async (req, res) => {
  
  try {
    let empList = 
    await dbConnect.query(
      `SELECT a.employee_code,
              a.employee_name
         FROM cor_employee_master a,
              ph_empstatus b
        WHERE a.company_code = ${companyCode}
          AND b.COMPCDE = a.company_code
          AND b.HEADCODE = a.emp_status 
          AND b.DOPPRO = 'Y'
        ORDER BY a.employee_name`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: empList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee information..'});
    res.end(); 
  }
};


exports.getBranchLovList = async (req, res) => {

  await branchModel.findAll({
    attributes: ['branch_code', 'branch_name'],
    where: {
      company_code: companyCode
    },
    order: [ 
      ['branch_name', 'ASC'],
    ]
  })
  .then(branch => { 
    res.json({isExecuted: true, data: branch});   
  }).catch((err) => {
    res.send(err);
  })
};


exports.getGradeLovList = async (req, res) => {

  divModel.findAll({
    where: { 
      company_code: companyCode
    },
    order: [ 
      ['description', 'ASC'],
    ]
  })
  .then((grade) => {
      res.send(grade);
  }).catch((err) => {
      res.send(err);
  })
};


exports.getDepartmentLovList = async (req, res) => {

  await departmentModel.findAll({
    attributes: ['dept_code', 'description', 'hard_code', 'soft_code'],
    where: { 
      company_code: companyCode,
      department_serial: {[Op.gt]: 0}
    },
    order: [ 
      ['description', 'ASC'],
    ]
  })
  .then(department => { 
    res.send(department);
  })
  .catch((err) => {
    res.send(err);
  })
};


exports.getEmployeeTypeLovList = async (req, res) => {
  
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'TY'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getCountryLovList = async (req, res) => {
  
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'CR'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getNationalityLovList = async (req, res) => {
  
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'NT'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getSexLovList = async (req, res) => {
 
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'SX'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getReligionLovList = async (req, res) => {
  
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'RG'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getMaritalStatusLovList = async (req, res) => {
  
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'MS'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getBloodGroupLovList = async (req, res) => {
  
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'BG'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getEmpCategoryLovList = async (req, res) => {
    
  codeMasterModel.findAll({
    attributes: ['code', 'description'],
    where: {
      company_code: companyCode,
      hard_code: 'CT'
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getExamNameLovList = async (req, res) => {
  
  examModel.findAll({
    attributes: ['examCode', 'examName'],
    where: {
      company_code: companyCode
    }
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getDistrictLovList = async (req, res) => {
  try {
    let districtList = 
    await dbConnect.query(
      `SELECT CONCAT(pyhdrcde, pysofcde) AS code, pycoddes AS district
         FROM districts
        ORDER BY pycoddes`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: districtList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
};


exports.getLeaveCodeLovList = async (req, res) => {
  leaveModel.findAll({
    attributes: ['leave_code', 'leave_name'],
    where: {
      company_code: companyCode
    },
    order: [
      ['leave_name', 'ASC']
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getOtherDesignationLovList = async (req, res) => {
  otherDesigModel.findAll({
    attributes: ['designationCode', 'designationName'],
    where: {
      company_code: companyCode
    },
    order: [
      ['designationName', 'ASC']
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getCompanyLovList = async (req, res) => {
  companyModel.findAll({
    attributes: [['soft_code', 'code'], 'description'],
    where: {
      company_code: companyCode
    },
    order: [
      ['description', 'ASC']
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getEducationLeavel = async (req, res) => {  
  try {
    eduLevelModel.findAll({
      attributes: [
        'company_code',
        'hard_code', 
        'soft_code',
        'description',
        'hierarchy',
        [Sequelize.fn("concat", Sequelize.col("hard_code"), Sequelize.col("soft_code")), 'headCode']
      ],
      where: {
        company_code: companyCode
      }
    })
    .then(getData => {  
      res.json(getData);
      res.end();     
    }) 
  } catch (err) {
    console.log(err);
  }
};


exports.getEducationBoardLovList = async (req, res) => {
  try {
    let eduBoardList = 
    await dbConnect.query(
      `SELECT CONCAT(hard_code, soft_code) AS code, description
         FROM con_edu_board
        WHERE company_code = ${companyCode}
        ORDER BY description`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: eduBoardList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
};


exports.getEducationResultLovList = async (req, res) => {
  try {
    let eduResultList = 
    await dbConnect.query(
      `SELECT CONCAT(hard_code, soft_code) AS code, description
         FROM con_exam_result
        WHERE company_code = ${companyCode}
        ORDER BY description`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: eduResultList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
};


exports.getSubjectLovList = async (req, res) => {
  try {
    let subjectList = 
    await dbConnect.query(
      `SELECT CONCAT(hard_code, soft_code) AS code, description
         FROM con_com_subj
        WHERE company_code = ${companyCode}
        ORDER BY description`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: subjectList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
};


exports.getInstituteLovList = async (req, res) => {
  try {
    let instituteList = 
    await dbConnect.query(
      `SELECT Pysofcde AS code, Pycoddes AS description
         FROM institute
        WHERE Pycomcde = ${companyCode}
        ORDER BY Pycoddes`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: instituteList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
};

exports.getLeaveTypeLovList = async (req, res) => {
  leaveTypeModel.findAll({
    attributes: ['hard_code', 'soft_code','description'],
    where: {
      company_code: companyCode
    },
    order: [
      ['soft_code', 'ASC']
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};

exports.getEmpListBySearch = async (req, res) => {    
  try {
      let searchData = req.params.data;
      let showLimit = 100;
      let statusList = [];
      empmasModel.belongsTo(designationModel,{ foreignKey:'designation',targetKey:'designationCode'});
      empmasModel.belongsTo(branchModel,{ foreignKey:'branch',targetKey:'branch_code'});
      empmasModel.belongsTo(gradeModel,{ foreignKey:'division',targetKey:'gradeCode'});
      empmasModel.belongsTo(departmentModel,{ foreignKey:'department',targetKey:'dept_code'});

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

     let empListInitial =
     await empmasModel.findAll({
          attributes: ['employee_code','employee_name', 'branch', 'designation', 'division', 'department'],
          where: {
              company_code: '200',
              emp_status : {
                  [Op.in]: [statusList]
              },
              [Op.or]: {
                  employee_code: {[Op.like]: `%${searchData}%`},
                  employee_name: {[Op.like]: `%${searchData}%`},
              }                
          },
          include: [
            {model: designationModel, attributes: ['designationName']},
            {model: branchModel, attributes: ['branch_name']},
            {model: gradeModel, attributes: ['gradeName']},
            {model: departmentModel, attributes: ['description']}
          ],
          limit: showLimit,
          order: [
              ['employee_code']
          ]
      })

      let empList =
       await empListInitial.map(data=>({
                employee_code: data.employee_code,
                employee_name: data.employee_name,
                branch: data.branch,
                designation: data.designation,
                division: data.division,
                department: data.department,
                branch_name: data.con_com_branchmaster.branch_name,
                designation_name: data.con_designation.designationName,
                department_name: data.con_department? data.con_department.description : null,
                division_name: data.con_grade? data.con_grade.gradeName : null
            }));

    return res.json({isExecuted:true, data: empList});  
  } catch (err) {
    console.log(err);
    return res.json({isExecuted:false, message: 'Error to get data'});
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
                              AND b.DOPPRO = 'Y' 
                              AND a.employee_code = '${empId}'`,
                    {type: QueryTypes.SELECT, plain: true});

   await empmasModel.findAll({
       where: {company_code: '200', employee_code: empId}
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