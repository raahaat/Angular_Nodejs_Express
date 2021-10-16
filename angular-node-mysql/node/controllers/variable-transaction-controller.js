const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const variableModel = require('../models/variable-transaction');

exports.addVariableTransaction = async (req, res) => {
 let compCode = '200';
 try {
   await variableModel.create(req.body)
      .catch((error)=> {
        return res.json({ isExecuted: false, message: "Error to insert"});
      })
   return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};

exports.getVariableData = async (req, res) => {
 let compCode = '200';
 try {
  // variableModel.findAll({
  //   where: { company_code: compCode}
  // })
   dbConnect.query(`select a.id, a.company_code, b.employee_name, a.employee_code, a.process_month, a.process_year, 
                    (select branch_name From con_com_branchmaster 
                     where company_code = b.company_code and branch_code = b.branch) branch_name, 
                    (Select headName From con_earn_head where company_code = b.company_code 
                     and headCode = a.salary_head) salary_head_desc, a.branch,
                     a.salary_head, a.amount, a.naration
                FROM variable_transaction a , cor_employee_master b
               WHERE a.company_code = '${compCode}'
                 AND a.company_code = b.company_code
                 AND a.employee_code = b.employee_code`, 
                   {type: QueryTypes.SELECT})
  .then(getData => {  
    return res.json(getData);
  })
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};


exports.getSingleTransaction = async (req, res) => {
 let infoId = req.params.id;
 try {
  variableModel.findAll({
    where: { 
      id: infoId
    }
  })
  .then(getData => {  
     return res.send(getData);
  })
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};


exports.deleteVariable = async (req, res) => {
  let deleteId = req.params.id;
  variableModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, message: "Data deleted successfully."});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Data is not deleted "});
        res.end();
      });
 };

 
exports.updateVariable = async (req, res) => {
  let updatedId = req.params.id;
  let empId = req.body.employee_code;
  try {
    variableModel.update({
      company_code        : req.body.company_code,
      employee_code       : req.body.employee_code,
      process_month       : req.body.process_month,
      process_year        : req.body.process_year,
      branch              : req.body.branch,
      transaction_code    : req.body.transaction_code,
      salary_head         : req.body.salary_head,
      working_hour        : req.body.working_hour,
      amount              : req.body.amount,
      percent             : req.body.percent,
      naration            : req.body.naration,
      reference           : req.body.reference,
      process_flag        : req.body.process_flag,
      update_by           : req.body.update_by,
      update_date         : new Date()
    }, {where: {id: updatedId}}
    )
    .then((updated)=> {
      res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + empId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
   } catch (err) {
     return res.json({ isExecuted: false, message: "Unknown Error: " + err });
   }
 };
