const dutyDeskModel = require('../models/cor-duty-desk');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const companyCode = '200';


exports.getDutyDeskList = async (req, res) => {  
  try {
    let empList = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              b.employee_name,
              a.desk_code,
              a.effective_date,
              a.expire_date,
              a.status,
              CASE
                WHEN a.status = 'A' THEN 'Active'
                WHEN a.status = 'E' THEN 'Expire'
              END
                AS status_name
         FROM cor_duty_desk a, cor_employee_master b
        WHERE a.company_code = ${companyCode}
          AND b.company_code = a.company_code
          AND b.employee_code = a.employee_code
        ORDER BY b.employee_name`,
      { type: QueryTypes.SELECT }
    );
 
    res.json({isExecuted: true, data: empList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee list..'});
    res.end(); 
  }
};


exports.addDutyDesk = async (req, res) => {
        
    const formData = {
        id              : req.body.id,        
        company_code    : req.body.company_code,   
        employee_code   : req.body.employee_code, 
        desk_code       : req.body.desk_code,    
        effective_date  : req.body.effective_date,
        expire_date     : req.body.expire_date,       
        status          : req.body.status,
        insert_by       : req.body.insert_by,
        insert_date     : req.body.insert_date,
    };

    dutyDeskModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};


exports.getDutyDeskById = async (req, res) => {  
  let editId = req.params.id;

  try {
    let empList = 
    await dbConnect.query(
      `SELECT a.id,
              a.company_code,
              a.employee_code,
              b.employee_name,
              a.desk_code,
              a.effective_date,
              a.expire_date,
              a.status,
              CASE
                WHEN a.status = 'A' THEN 'Active'
                WHEN a.status = 'E' THEN 'Expire'
              END
                AS status_name
        FROM cor_duty_desk a, cor_employee_master b
        WHERE a.company_code = ${companyCode}
          AND a.id = ${editId}
          AND b.company_code = a.company_code
          AND b.employee_code = a.employee_code
        ORDER BY b.employee_name`,
      { type: QueryTypes.SELECT, plain: true }
    );
 
    res.json({isExecuted: true, data: empList});
    res.end(); 

  } catch {
    res.json({isExecuted: false, message: 'Error when fetching employee list..'});
    res.end(); 
  }
};


exports.updateDutyDesk = async (req, res) => {
    let updatedId = req.params.id;

    dutyDeskModel.update({
      id              : req.body.id,     
      employee_code   : req.body.employee_code,
      desk_code       : req.body.desk_code,
      effective_date  : req.body.effective_date,
      expire_date     : req.body.expire_date,  
      status          : req.body.status,
      update_by       : req.body.update_by,
      update_date     : req.body.update_date,
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


exports.deleteDutyDesk = async (req, res) => {
    let deleteId = req.params.id;
    
    dutyDeskModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Division Zone is not deleted for : "+ deleteId});
        res.end();
    });
};
