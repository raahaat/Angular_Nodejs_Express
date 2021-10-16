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
const assetCostSetupModal = require('../models/asset-cost-setup-modal');





exports.addAssetCost = async (req, res) => {
  console.log(req.body);
  let assetCost = req.body.times;
  await assetCostSetupModal.bulkCreate(assetCost).then((data) => {
      // return res.json('Successfully Done!');
      res.json({isExecuted: true, message: "Successfull Inserted"});
      res.end();
  }).catch((err) => {
      res.json({isExecuted: false, message: "Error to insert Data"});
      res.end();
      console.log('Add Cost Error: ', err);
  })
}


exports.updateAssetCost = async (req, res) => {
  let updatedId = req.params.id;
  assetCostSetupModal.findOne({
   where: {
    id: { [Op.ne]: updatedId },
    company_code: req.body.company_code}
   })
   .then(data => {
     if (!data) {
      assetCostSetupModal.update(
        { asset_code:       req.body.asset_code,
          cost_code:        req.body.cost_code,
          cost_desc:        req.body.cost_desc,
          unit_measurement: req.body.unit_measurement,
          update_by:        req.body.update_by,
          update_date:      req.body.update_date},
          {where: {id: updatedId}}
        )
        .then(()=> {
          res.json({isExecuted:true, message:"Successfully Updated Data."});
          res.end();
        })
        .catch (err => {
          res.json({isExecuted:false, message:"Unknown Error: "+ err});
          res.end();
        })
     } else {
       res.json({isExecuted:false, message:"Data already exists in table."});
       res.end();
     }
   })
 };


exports.getAssetCost = async (req, res) => {
  let companyCode = '200';
  
  assetCostSetupModal.findAll( { 
    where: {
        company_code: companyCode
      }
    }
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


exports.getSingleAssetCostData = async (req, res) => {
  let infoId = req.params.id;
  try {
    assetCostSetupModal.findOne({
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



exports.deleteAssetCost = async (req, res) => {
  let deleteId = req.params.id;

  assetCostSetupModal.destroy(
    {where:{id: deleteId}}
  )
  .then(deletedData => {
    res.json({isExecuted:true,data: deletedData});
    res.end();
  })
  .catch(err => {
    res.json({isExecuted:false, message: "Data not deleted for :"+ deleteId});
    res.end();
  });
};

// -------------------End---------------------