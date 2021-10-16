const confirmExtendModel = require('../models/cor-confirm-date-extend');
const empMasterModel = require('../models/cor-employee-master');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');
const companyCode = '200';
const moment = require('moment');


exports.getConfirmDateExtend = async (req, res) => {   
  try {
    let fetchData = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              b.employee_name,
              a.designation,
              (SELECT designationName
                FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.designation
                  AND designationRank IS NOT NULL) AS designation_name,
              a.document_date,
              a.old_confirm_date,
              a.new_confirm_date,
              a.remarks
        FROM cor_confirm_date_extend a, cor_employee_master b
        WHERE a.company_code = ${companyCode}
          AND b.company_code = a.company_code
          AND b.employee_code = a.employee_code
        ORDER BY b.employee_name`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: fetchData});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
};   


exports.addConfirmDateExtend = async (req, res) => {
  let newConfirmDate = moment(req.body.new_confirm_date).format('YYYY-MM-DD');
        
    // const formData = {
    //   company_code    : req.body.company_code,
    //   employee_code   : req.body.employee_code,
    //   designation     : req.body.designation,
    //   confirm_flag    : req.body.confirm_flag,
    //   document_date   : req.body.document_date,
    //   old_confirm_date: req.body.old_confirm_date,
    //   new_confirm_date: req.body.new_confirm_date,
    //   remarks         : req.body.remarks,
    //   insert_by       : req.body.insert_by,
    //   insert_date     : req.body.insert_date 
    // };

    confirmExtendModel.create(req.body)
    .then((data)=> {
      empMasterModel.update({
        confirm_date: newConfirmDate
      }, {where: {
        company_code: companyCode,
        employee_code: req.body.employee_code,
        confirm_flag: 'P'
        }
      })
      res.json({isExecuted: true, message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error '+ err);
    })
};


exports.getConfirmDateExtendById = async (req, res) => {   
  let editId = req.params.id;

  try {
    let fetchData = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              b.employee_name,
              a.designation,
              (SELECT designationName
                FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.designation
                  AND designationRank IS NOT NULL) AS designation_name,
              a.document_date,
              a.old_confirm_date,
              a.new_confirm_date,
              a.remarks
        FROM cor_confirm_date_extend a, cor_employee_master b
        WHERE a.company_code = ${companyCode}
          AND a.id = ${editId}
          AND b.company_code = a.company_code
          AND b.employee_code = a.employee_code`,
      { type: QueryTypes.SELECT, plain: true }
    );

    res.json({isExecuted: true, data: fetchData, message: "Data fetched successfully."});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching data..'});
    res.end(); 
  }
}; 


exports.updateConfirmDateExtend = async (req, res) => {
    let updatedId = req.params.id;
    let newConfirmDate = moment(req.body.new_confirm_date).format('YYYY-MM-DD');

    await confirmExtendModel.update( 
      req.body , {where: {id: updatedId}} 
    )
    .then((updated)=> {
      empMasterModel.update({
        confirm_date: newConfirmDate
      }, {where: {
        company_code: companyCode,
        employee_code: req.body.employee_code,
        confirm_flag: 'P'
        }
      })
      res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
};


exports.deleteConfirmDateExtend = async (req, res) => {
    let deleteId = req.params.id;
    
    confirmExtendModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Company List is not deleted for : "+ deleteId});
        res.end();
    });
};


exports.getEmpProbationList = async (req, res) => {   
  try {
    let empList = 
    await dbConnect.query(
      `SELECT a.employee_code,
              a.employee_name,
              a.join_date,
              a.designation,
              (SELECT designationName
                FROM con_designations
                WHERE company_code = a.company_code
                  AND designationCode = a.designation
                  AND designationRank IS NOT NULL)
                AS designation_name,
              a.confirm_date
        FROM cor_employee_master a, ph_empstatus b
        WHERE a.company_code = ${companyCode}
          AND a.confirm_flag = 'P'
          AND b.COMPCDE = a.company_code
          AND b.HEADCODE = a.emp_status
          AND b.DOPPRO = 'Y'
        ORDER BY a.employee_name`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: empList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee list..'});
    res.end(); 
  }
};   