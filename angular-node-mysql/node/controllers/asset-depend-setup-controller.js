const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const assetDependSetupModel = require('../models/asset-depend-setup-model');
const earningHeadSetupModel = require('../models/earning-head-setup-model');







exports.addAssetDepend = async (req, res) => {
  console.log(req.body);
  let assetDepend = req.body;
  await assetDependSetupModel.create(assetDepend).then((data) => {
      // return res.json('Successfully Done!');
      res.json({isExecuted: true, message: "Successfull Inserted"});
      res.end();
  }).catch((err) => {
      res.json({isExecuted: false, message: "Error to insert Data"});
      res.end();
      console.log('Add asset depend Error: ', err);
  })
}


exports.updateAssetMaster = async (req, res) => {
  let updatedId = req.params.id;
  let companyCode = req.body.company_code;
  console.log(req.body);
  try {
    assetDependSetupModel.update(req.body 
      , {where: {id:            updatedId},
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


exports.getAssetdepend = async (req, res) => {
  let companyCode = '200';
  assetDependSetupModel.belongsTo(earningHeadSetupModel,{ foreignKey:'depend_on_code',targetKey:'headCode'});
  assetDependSetupModel.findAll( { 
    where: {
        company_code: companyCode
      },include:[{model: earningHeadSetupModel, attributes:['headName']}]
    }
  )
  .then(editData => {
    newDta = editData.map(data=>({
      id:                 data.id,
      company_code:       data.company_code,
      asset_code:         data.asset_code,
      asset_description:  data.asset_description,
      depend_on_code:     data.depend_on_code,
      insert_by:          data.insert_by,
      insert_date:        data.insert_date,
      update_by:          data.update_by,
      update_date:        data.update_date,
      headName:           data.con_earn_head.headName
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


exports.deleteAssetDepend = async (req, res) => {
  let deleteId = req.params.id;

  assetDependSetupModel.destroy(
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