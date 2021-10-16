const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const carCostModel = require('../models/car-cost-setup');

exports.checkDuplicate = async (req, res) => {
  try{
      await carCostModel.findAll({
        where: {
          designation: req.body.designation,
          asset_code: req.body.asset_code,
          cost_code: req.body.cost_code
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

exports.addCarCost = async (req, res) => {
 let compCode = '200';
 try {
   await carCostModel.bulkCreate(req.body.obj)
      .catch((error)=> {
        return res.json({ isExecuted: false, message: "Error to insert"});
      })
   return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};

exports.getCarCostData = async (req, res) => {
 let compCode = '200';
 try {
   dbConnect.query(`select a.id, a.company_code, 
                           (Select designationName From con_designations where company_code = a.company_code 
                       and designationCode = a.designation) designation_name , 
                       (CASE WHEN a.asset_code = '001' THEN 'Car Maintenance' ELSE null END) asset_code, 
                       (CASE WHEN a.cost_code = '001' THEN 'Fuel' 
                             WHEN a.cost_code = '002' THEN 'Driver' 
                             WHEN a.cost_code = '003' THEN 'Servicing' 
                        ELSE null END) cost_code, a.quantity
                      FROM car_cost_setup a 
                     WHERE a.company_code = '${compCode}'`, 
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
  carCostModel.findAll({
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


exports.deleteCarCost = async (req, res) => {
  let deleteId = req.params.id;
  carCostModel.destroy(
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

 
exports.updateCarCost = async (req, res) => {
  let updatedId = req.params.id;
  let empId = req.body.employee_code;
  try {
    carCostModel.update(req.body, 
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
