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
const proposeTransferModel = require('../models/cor-propose-transfer');



exports.proposedTransferProcess = async (req, res) => {
 console.log(req.body);
};

exports.getCodeHeader = async (req, res) => {
  let companyCode = '200';
  
  codeMasterModel.findAll({
    attributes: ['soft_code', 'description'],   
    where: {
      company_code: companyCode,
      hard_code: 'XX'
    }
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};




exports.addProposeTransfer = (req, res) => {
 let transferData = req.body;
  proposeTransferModel.bulkCreate(transferData).then(() => {
      return res.send('Successfully Done!');
  }).catch((err) => {
      res.send(err);
      console.log('Add proposal Error: ', err);
  })
}




// -------------------------------For Lov-------------------------------
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



exports.getDepartment = async (req, res) => {
  // let hardCode = req.params.dept.substring(0,2);
  // let softCode = req.params.dept.substring(2);

  deptModel.findAll({
      where: {company_code: '200'} //, hard_code: hardCode, soft_code: softCode}
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
  // let hardCode = req.params.div.substring(0,2);
  // let softCode = req.params.div.substring(2);

  divModel.findAll({
      where: {company_code: '200'} //, hard_code: hardCode, soft_code: softCode}
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
  // let branchCode = req.params.branch;

  branchModel.findAll({
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


// --------------------------------------------------------------------

          exports.getActiveEmpListByParams = async (req, res) => {
            const branchFrom = req.body.branch_from;
            const branchTo   = req.body.branch_to;
            const desigFrom = req.body.designation_from;
            const desigTo = req.body.designation_to;
            const companyCode = '200';
            const employeeCode = req.body.employee_code;
            const division      = req.body.division;
            const department    = req.body.department;
            const asonDate      = req.body.asonDate;
            const maxdur        = req.body.maxdur;
            const mindur        = req.body.mindur;
            const groupCode        = req.body.group_code;






          await dbConnect.query(`SELECT a.employee_code, a.employee_name, a.branch old_branch, a.designation,
                                        a.division old_division, a.department old_department, a.category, a.emp_type, a.emp_status,
                                        '${groupCode}' group_code, 'N' order_flag, null proposed_branch,
                                        null proposed_date,
                                        (SELECT branch_name FROM con_com_branchmaster
                                          WHERE company_code = a.company_code AND branch_code = a.branch) branch_name,
                                        b.designationName designation_name, a.basic_pay,
                                          Null insert_by, null insert_date
                                  FROM cor_employee_master a, con_designations b
                                  WHERE a.company_code = '${companyCode}'
                                    And a.company_code = b.company_code
                                    And a.designation = b.designationCode
                                    And b.designationRank is not null
                                    AND a.employee_code = IF ('${employeeCode}' = 'All', a.employee_code, '${employeeCode}')
                                    AND a.branch BETWEEN '${branchFrom}' and '${branchTo}'
                                    AND b.designationRank BETWEEN ${desigFrom} and ${desigTo}
                                    AND a.division = IF ('${division}' = 'All', a.division, '${division}')
                                    AND a.department = IF ('${department}'='All', a.department, '${department}')
                                    AND a.emp_status = 'ST001'
                                    And (DATEDIFF ('${asonDate}',(SELECT MAX(effective_date)
                                                                    FROM employee_growth 
                                                                  WHERE company_code = '${companyCode}'
                                                                    AND document_type IN ('JN','TF') 
                                                                    AND new_branch <> IFNULL(old_branch,'000')
                                                                    AND new_branch = a.branch 
                                                                    AND employee_code = a.employee_code))/12 
                                         between IF(${mindur} = Null,0,${mindur}) And IFNULL(${maxdur},100)) 
                                  ORDER BY b.designationRank, a.branch, a.designation, a.employee_code`,
                                  {type: QueryTypes.SELECT})
                                  .then((getData)=> {
                                    if (getData) {
                                      res.json({isExecuted:true, data: getData});
                                      res.end();
                                    } else {
                                      res.json(null);
                                    }
                                  }).catch((err)=> {
                                    console.log(`My Error: ${err}`);
                                  })
        };


console.log('getData');



// ----------------------Proposed Approval--------------------------- 

exports.getProposeApproval = async (req, res) => {
  try{  
      let companyCode = '200';
      let proposeData =
      await dbConnect.query(`SELECT p.id,
                                    p.order_flag,
                                    e.employee_name,
                                    (SELECT branch_name
                                      FROM con_com_branchmaster b
                                      WHERE     b.company_code = p.company_code
                                            AND b.branch_code = p.proposed_branch)
                                      proposed_branch,
                                    (SELECT g.gradeName
                                      FROM con_grades g
                                      WHERE     g.company_code = p.company_code
                                            AND g.gradeCode = p.proposed_division)
                                      proposed_division,
                                    (SELECT d.description
                                      FROM con_department d
                                      WHERE     d.company_code = p.company_code
                                            AND d.dept_code = p.proposed_department)
                                      proposed_department,
                                    d.designationName designation
                              FROM cor_transfer_propose p, cor_employee_master e, con_designations d
                              WHERE     p.company_code = '${companyCode}'
                                    AND p.company_code = e.company_code
                                    AND e.employee_code = p.employee_code
                                    AND e.company_code = d.company_code
                                    AND e.designation = d.designationCode
                                    AND IFNULL(p.order_flag, 'N') = 'N'`,
                                    {type: QueryTypes.SELECT});
                        console.log(proposeData);
                        res.json({isExecuted:true, data: proposeData});
                        res.end();
                      } catch(err) {
                          console.log(err);
                      }
                  };


// exports.updateProposedApproval = async (req, res) => {
//   try {
//     const objKeys = Object.keys(req.body.obj);
//     console.log(objKeys);
//     for (let i = 0; i <= objKeys.length; i++) {
//       await proposeTransferModel.update(
//         {
//           order_flag: req.body.obj[objKeys[i]],
//         },
//         { where: { id: objKeys[i] } }
//       );
//     }
//     res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
//     res.end();
//   } catch (err) {
//     res.json({ isExecuted: false, message: "Unknown Error: " + err });
//     res.end();
//   }

// };

exports.updateProposedApproval = async (req, res) => {
  
  try {
    const value = req.body;
    console.log(value);
    const updatedId= req.params.id ;
    await proposeTransferModel.update(value,{where: {id: updatedId}})
    .then(updated =>{
    res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
    res.end();
    }).catch(err => {
      res.json({isExecuted:false, message: "Error to get data."});
      res.end();
    });
  } catch (err) {
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    res.end();
  }

};
// -------------------End---------------------