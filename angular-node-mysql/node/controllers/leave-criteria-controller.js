const leaveCriteriaModel = require('../models/con-leave-criteria');

exports.getLeaveCriteriaList = async (req, res) => {
    leaveCriteriaModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addLeaveCriteria = async (req, res) => {
        
    const formData = {
        id                  : req.body.id,      
        company_code        : req.body.company_code,
        leave_type_code     : req.body.leave_type_code,
        auto_deduct         : req.body.auto_deduct,
        leave_deduct_from   : req.body.leave_deduct_from,
        maximum_day         : req.body.maximum_day,
        leave_taken_time    : req.body.leave_taken_time,
        yearly              : req.body.yearly,
        employee_type       : req.body.employee_type,
        criteria_start_from : req.body.criteria_start_from,
        criteria_in_year    : req.body.criteria_in_year,
        negetive_allow      : req.body.negetive_allow,
        allow_days          : req.body.allow_days,
        apply_in_holiday    : req.body.apply_in_holiday,
        insert_by           : req.body.insert_by,
        insert_date         : req.body.insert_date
    };

    leaveCriteriaModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getLeaveCriteriaById = async (req, res) => {
  let editId = req.params.id;
  
  leaveCriteriaModel.findOne(
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


exports.updateLeaveCriteria = async (req, res) => {
    let updatedId = req.params.id;

    leaveCriteriaModel.update({
        // id          : req.body.id,
        // company_code: req.body.company_code,
        leave_type_code     : req.body.leave_type_code,
        auto_deduct         : req.body.auto_deduct,
        leave_deduct_from   : req.body.leave_deduct_from,
        maximum_day         : req.body.maximum_day,
        leave_taken_time    : req.body.leave_taken_time,
        yearly              : req.body.yearly,
        employee_type       : req.body.employee_type,
        criteria_start_from : req.body.criteria_start_from,
        criteria_in_year    : req.body.criteria_in_year,
        negetive_allow      : req.body.negetive_allow,
        allow_days          : req.body.allow_days,
        apply_in_holiday    : req.body.apply_in_holiday,
        update_by           : req.body.update_by,
        update_date         : req.body.update_date 
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


exports.deleteLeaveCriteria = async (req, res) => {
    let deleteId = req.params.id;
    
    leaveCriteriaModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Education Board is not deleted for : "+ deleteId});
        res.end();
    });
};
