const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const carRegisterModel = require('../models/car-register');

exports.addCarRegister = async (req, res) => {
 let compCode = '200';
 try {
   await carRegisterModel.bulkCreate(req.body.obj)
      .catch((error)=> {
        return res.json({ isExecuted: false, message: "Error to insert"});
      })
   return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};

exports.getCarRegisterData = async (req, res) => {
 let compCode = '200';
 try {
   dbConnect.query(`select a.id, a.company_code, b.employee_name, a.employee_code, a.car_register_date, a.car_register_number, 
                           a.car_id_number, a.action_flag,
                            (Select branch_name From con_com_branchmaster 
                              where company_code = b.company_code and branch_code = b.branch) branch_name, 
                            (Select designationName From con_designations where company_code = b.company_code 
                                and designationCode = b.designation) designation_name
                      FROM car_register a , cor_employee_master b
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


exports.getSingleCarData = async (req, res) => {
 let infoId = req.params.id;
 try {
  carRegisterModel.findAll({
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


exports.deleteCarRegister = async (req, res) => {
  let deleteId = req.params.id;
  carRegisterModel.destroy(
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

 
exports.updateCarRegister = async (req, res) => {
  let updatedId = req.params.id;
  let empId = req.body.employee_code;
  try {
    carRegisterModel.update(req.body 
      , {where: {id: updatedId}}
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
