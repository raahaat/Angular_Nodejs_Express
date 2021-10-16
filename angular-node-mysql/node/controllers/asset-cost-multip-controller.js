const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const proposeTransferModel = require('../models/cor-propose-transfer');
const assetCostSetupModal = require('../models/asset-cost-setup-modal');
const assetCostMultiplicationModal = require('../models/asset-cost-multiplication-modal');



exports.addCostMultip = async (req, res) => {
  let costMultip = req.body.times;
  await assetCostMultiplicationModal.bulkCreate(costMultip).then((data) => {
      res.json({isExecuted: true, message: "Successfull Inserted"});
      res.end();
  }).catch((err) => {
      res.json({isExecuted: false, message: "Error to insert Data"});
      res.end();
      console.log('Add Cost Error: ', err);
  })
}

exports.updateCostMultip = async (req, res) => {
  let updatedId = req.params.id;
  let companyCode = req.body.company_code;
  console.log(req.body);
  // let empId = req.body.employee_code;
  try {
    assetCostMultiplicationModal.update(req.body 
      , {where: {id: updatedId},
                 company_code : companyCode}
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


exports.getAssetCostMultip = async (req, res) => {
  let companyCode = '200';
  assetCostMultiplicationModal.belongsTo(assetCostSetupModal,{ foreignKey:'cost_code',targetKey:'cost_code'});
  assetCostMultiplicationModal.findAll( { 
    where: {
        company_code: companyCode
      },include:[{model: assetCostSetupModal, attributes:['cost_desc']}]
    }
  )
  .then(editData => {
    newDta = editData.map(data=>({
      id: data.id,
      company_code: data.company_code,
      asset_code: data.asset_code,
      cost_code: data.cost_code,
      multip_amount: data.multip_amount,
      effective_date: data.effective_date,
      expire_date: data.expire_date,
      expire_by: data.expire_by,
      insert_by: data.insert_by,
      insert_date: data.insert_date,
      update_by: data.update_by,
      update_date: data.update_date,
      cost_desc: data.asset_cost_setup.cost_desc
    }));
    console.log("data" ,newDta);
    
    res.json({isExecuted:true, data: newDta, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};


exports.getAssetCostList = async (req, res) => {
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


exports.getSingleCostMultipData = async (req, res) => {
  let infoId = req.params.id;
  try {
    assetCostMultiplicationModal.findOne({
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



exports.deleteAssetCostMultip = async (req, res) => {
  let deleteId = req.params.id;

  assetCostMultiplicationModal.destroy(
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