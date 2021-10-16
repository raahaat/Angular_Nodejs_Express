const branchModel = require('../models/branch-master-setup');
const { Op } = require("sequelize");

exports.getBranchMasterList = async (req, res) => {
    branchModel.findAll()
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
};


exports.deleteBranch = async (req, res) => {
    let deleteId = req.params.id;
    branchModel.destroy(
        { where: {id: deleteId}}
      )
      .then( () => {
            res.json({isExecuted:true, message: "Data deleted successfully."});
            res.end();
          })
        .catch(err => {
          res.json({isExecuted:false, message: "Data is not deleted."});
          res.end();
        });
};


exports.editBranch= async (req, res) => {
  let editId = req.params.id;
  branchModel.findOne(
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


exports.updateBranch = async (req, res) => {
    let updatedId = req.params.id;
    branchModel.findOne({
     where: {
      id: { [Op.ne]: updatedId },
      company_code: req.body.company_code,
      branch_code: req.body.branch_code
     }
     })
     .then(data => {
       if (!data) {
        branchModel.update(
          { company_code: req.body.company_code,
          branch_code: req.body.branch_code,
          branch_name: req.body.branch_name,
          branch_short: req.body.branch_short,
          address: req.body.address,
          short_address: req.body.short_address,
          mail_address: req.body.mail_address,
          opening_date: req.body.opening_date,
          hand_over: req.body.hand_over,   
          update_by: req.body.update_by,      
          update_date: req.body.update_date },
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
   

exports.addBranch = async (req, res) => {
  const branchData = {
    company_code: req.body.company_code,
    branch_code: req.body.branch_code,
    branch_name: req.body.branch_name,
    branch_short: req.body.branch_short,
    address: req.body.address,
    short_address: req.body.short_address,
    mail_address: req.body.mail_address,
    opening_date: req.body.opening_date,
    hand_over: req.body.hand_over,
    insert_by: req.body.insert_by,      
    insert_date: req.body.insert_date    
  };

  branchModel.findOne({
    where: {
      company_code: req.body.company_code,
      branch_code: req.body.branch_code
    }
    })
    .then(data => {
      if (!data) {
        branchModel.create(branchData)
          .then(() => {
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