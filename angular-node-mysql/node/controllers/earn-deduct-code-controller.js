const EarnDeductModel =  require('../models/earn-deduct-code');
const EarnDedAdjModel = require('../models/earn-deduct-adjustment');
const { Op } = require("sequelize");
 
exports.getEarnDeductCodeList = async (req, res) => {
    EarnDeductModel.findAll()
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
};


exports.getEarnDeductAdjList = async (req, res) => {
    EarnDedAdjModel.findAll()
    .then(getData => {  
      res.json({isExecuted:true, data: getData});
      res.end();     
    })  
};

exports.deleteEarnDeductAdj = async (req, res) => {
    let deleteId = req.params.id;
    EarnDedAdjModel.destroy(
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


exports.editEarnDeductAdj = async (req, res) => {
  let editId = req.params.id;
  EarnDedAdjModel.findOne(
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


  exports.updateEarnDeductAdj = async (req, res) => {
    let updatedId = req.params.id;
    EarnDedAdjModel.findOne({
     where: {
      id: { [Op.ne]: updatedId },
      company_code: req.body.company_code,
      code: req.body.code }
     })
     .then(data => {
       if (!data) {
        EarnDedAdjModel.update(
         {company_code: req.body.company_code,
          code: req.body.code,
          rev_code: req.body.rev_code,
          update_date: req.body.update_date,
          update_by: req.body.update_by},
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

exports.addEarnDeductAdj = async (req, res) => {
  const earnDeductData = {
    company_code: req.body.company_code,
    code: req.body.code,
    rev_code: req.body.rev_code,
    insert_by: req.body.insert_by,
    insert_date: req.body.insert_date,
  };

  EarnDedAdjModel.findOne({
    where: {
      company_code: req.body.company_code,
      code: req.body.code
    }
    })
    .then(data => {
      if (!data) {
        EarnDedAdjModel.create(earnDeductData)
          .then(data => {
            res.status(201).json({isExecuted:true, message:"Successfully data added."});
            res.end();
          })
          .catch(err => {
            res.json({isExecuted:false, message:"Error to save data."});
            res.end();
          }) 
      } else {
        res.json({isExecuted:false, message:"Data already exists in table."});
        res.end();
      }
    })
    .catch(err => {
      res.json({isExecuted:false, message:"Error to save data!!!"});
      res.end();
    })
};