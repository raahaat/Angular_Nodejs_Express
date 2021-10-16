const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
const userTypeModel = require('../models/user-type');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const companyCode = '200';



exports.getUserType = async (req, res) => {
  try {
    let userType = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.user_id,
              a.user_type,
              (SELECT description
                FROM con_code_master
                WHERE company_code = a.company_code
                  AND hard_code = 'UT'
                  AND code = a.user_type) user_type_name,
              a.employee_code,
              a.employee_name,
              a.email,
              a.user_status,
              CASE
                WHEN user_status = 'A' THEN 'Active'
                WHEN user_status = 'E' THEN 'Expire'
                ELSE a.user_status
              END user_status_name
         FROM user_type a
        WHERE a.company_code = '${companyCode}'
        ORDER BY a.employee_code`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: userType});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching user type...'});
    res.end(); 
  }
};


exports.addUserType = async (req, res) => { 
  const formData = {
    company_code  : req.body.company_code,
    user_id       : req.body.user_id,
    user_type     : req.body.user_type,
    employee_code : req.body.employee_code,
    employee_name : req.body.employee_name,
    email         : req.body.email,
    user_status   : req.body.user_status,   
    insert_by     : req.body.insert_by,
    insert_date   : req.body.insert_date 
  };

  userTypeModel.create(formData)
  .then((data)=> {
    res.json({message : 'Successfully inserted.'});
    res.end();
  }).catch((err)=> {
      console.log('Error');
  })
};


exports.getUserTypeById = async (req, res) => {
  let editId = req.params.id;
  
  userTypeModel.findOne(
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


exports.updateUserType = async (req, res) => {
  let updatedId = req.params.id;

  userTypeModel.update({
    // id          : req.body.id,
    // company_code: req.body.company_code,
    user_id       : req.body.user_id,
    user_type     : req.body.user_type,
    employee_code : req.body.employee_code,
    employee_name : req.body.employee_name,
    email         : req.body.email,
    user_status   : req.body.user_status,  
    update_by     : req.body.update_by,
    update_date   : req.body.update_date 
  }, {where: {id: updatedId}}
  )

  .then((updated)=> {
    res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
    res.end();
  })
  .catch (err => {
    res.json({isExecuted:false, message:"Unknown Error: "+ err});
    res.end();
  })
};


exports.deleteUserType = async (req, res) => {
    let deleteId = req.params.id;
    
    userTypeModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData, message: 'Data successfully deleted'});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Company List is not deleted for : "+ deleteId});
        res.end();
    });
};


exports.getUserDuplicateCheck = async (req, res) => {
  let userId = req.params.id;
  console.log(userId);
  try {
    let idCheck = 
    await dbConnect.query(
      `SELECT count(user_id) user_count
         FROM user_type
        WHERE company_code = '${companyCode}'
          AND user_id = '${userId}'`,
      { type: QueryTypes.SELECT, plain:true }
    );
 
    console.log(idCheck);
    res.json(idCheck);
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee id check..'});
    res.end(); 
  }
}


exports.getUserList = async (req, res) => {
  try {
    let userList = 
    await dbConnect.query(
      `SELECT USERCODE AS user_id,
              USERNAME AS user_name,
              EMPLCODE AS employee_code,
              EMAILID1 AS email
         FROM user_master
        ORDER BY USERCODE`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: userList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching user type...'});
    res.end(); 
  }
};


exports.getApprovalTypeCode = async (req, res) => {
  try {
    let typeCode = 
    await dbConnect.query(
      `SELECT code, description
         FROM con_code_master
        WHERE company_code = '${companyCode}' 
          AND hard_code = 'UT'
        ORDER BY description`,
      { type: QueryTypes.SELECT }
    );

    res.json({isExecuted: true, data: typeCode});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching user type...'});
    res.end(); 
  }
};