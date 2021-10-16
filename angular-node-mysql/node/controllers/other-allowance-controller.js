const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const otherAllowanceModel = require('../models/other-allowance-entry');

exports.checkDuplicate = async (req, res) => {
  try{
      await otherAllowanceModel.findAll({
        where: {
          employee_code: req.body.employee_code,
          salary_head: req.body.salary_head,
          status: req.body.status
        }
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "Duplicate entry found in database table!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
  } catch(error) {
    console.log(error);
    return res.json({ isExecuted: false, message: "Error occured to find data in table!"});
  }
}


exports.addOtherAllowance = async (req, res) => {
 let compCode = '200';
 try {
    await otherAllowanceModel.bulkCreate(req.body.obj)
        .catch((error)=> {
          return res.json({ isExecuted: false, message: "Error to insert"});
        })
    return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};

exports.getOtherAllowance = async (req, res) => {
 let compCode = '200';
 try {
   dbConnect.query(`select a.id, a.company_code, b.employee_name, a.employee_code, a.effective_date, a.expiry_date, 
                    (Select headName From con_earn_head where company_code = b.company_code 
                      and headCode = a.salary_head) head_desc, a.amount,
                      a.salary_head, a.status
                  FROM other_allowance_entry a , cor_employee_master b
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


exports.getSingleEntry = async (req, res) => {
 let infoId = req.params.id;
 try {
  otherAllowanceModel.findAll({
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


exports.deleteOtherAllowance = async (req, res) => {
  let deleteId = req.params.id;
  otherAllowanceModel.destroy(
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

 
exports.updateOtherAllowance = async (req, res) => {
  let updatedId = req.params.id;
  let empId = req.body.employee_code;
  try {
    otherAllowanceModel.update(req.body, 
      {where: {id: updatedId}}
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
