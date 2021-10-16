const prCriteriaModel = require('../models/pr-criteria');
const { Op } = require("sequelize");

exports.prCriteriaList = async (req, res) => {
    prCriteriaModel.findAll()
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
};

exports.addPrCriteria = async (req, res) => {

    const criteriaData = {
        company_code: req.body.company_code,
        designation_from: req.body.designation_from,
        change_type: req.body.change_type,
        designation_to: req.body.designation_to,
        duration: req.body.duration,
        validation_from: req.body.validation_from,
        validation_to: req.body.validation_to,
        valid_flag: req.body.valid_flag,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date
    };
  
    prCriteriaModel.findOne({
      where: {
        designation_from: req.body.designation_from,
        change_type: req.body.change_type,
        designation_to: req.body.designation_to,
        valid_flag: req.body.valid_flag
      }
      })
      .then(data => {
        if (!data) {
            prCriteriaModel.create(criteriaData)
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

  exports.editCriteria = async (req, res) => {
    let editId = req.params.id;
    prCriteriaModel.findOne(
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


   exports.updateCriteria = async (req, res) => {
    let updatedId = req.params.id;
    prCriteriaModel.findOne({
     where: {
       id: { [Op.ne]: updatedId },
       company_code: req.body.company_code,
       designation_from: req.body.designation_from,
       change_type: req.body.change_type,
       designation_to: req.body.designation_to,
       valid_flag: req.body.valid_flag
     }
     })
     .then(data => {
       if (!data) {
        prCriteriaModel.update(
          {company_code: req.body.company_code,
           designation_from: req.body.designation_from,
           change_type: req.body.change_type,
           designation_to: req.body.designation_to,
           duration: req.body.duration,
           validation_from: req.body.validation_from,
           validation_to: req.body.validation_to,
           valid_flag: req.body.valid_flag,
           update_by: req.body.update_by,
           update_date: req.body.update_date},
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


   exports.deleteCriteria = async (req, res) => {
    let deleteId = req.params.id; 
    prCriteriaModel.destroy(
        { where: {id: deleteId}}
      )
      .then( () => {
            res.json({isExecuted:true, message: "Data deleted successfully."});
            res.end();
          })
      .catch(err => {
        res.json({isExecuted:false, message: "Data is not deleted "});
        res.end();
      });
};
  
