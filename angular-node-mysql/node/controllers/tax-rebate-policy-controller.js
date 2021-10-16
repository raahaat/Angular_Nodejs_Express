const taxRebateModel = require('../models/con-tax-rebate-policy');


exports.getTaxRebatePolicyList = async (req, res) => {
  taxRebateModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addTaxRebatePolicy = async (req, res) => {
        
    const formData = {
        id                : req.body.id,
        company_code      : req.body.company_code,        
        effective_date    : req.body.effective_date,
        expire_date       : req.body.expire_date,      
        serial_no         : req.body.serial_no,
        percent_of_invest : req.body.percent_of_invest,
        minimum_invest    : req.body.minimum_invest,
        maximum_invest    : req.body.maximum_invest,
        percent_of_rebate : req.body.percent_of_rebate,
        minimum_rebate    : req.body.minimum_rebate,
        maximum_rebate    : req.body.maximum_rebate,
        status            : req.body.status,
        insert_by         : req.body.insert_by,
        insert_date       : req.body.insert_date,
    };

    taxRebateModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getTaxRebatePolicyById = async (req, res) => {
  let editId = req.params.id;
  
  taxRebateModel.findOne(
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


exports.updateTaxRebatePolicy = async (req, res) => {
    let updatedId = req.params.id;

    taxRebateModel.update({
      id                : req.body.id,     
      effective_date    : req.body.effective_date,
      expire_date       : req.body.expire_date, 
      serial_no         : req.body.serial_no,
      percent_of_invest : req.body.percent_of_invest,
      minimum_invest    : req.body.minimum_invest,
      maximum_invest    : req.body.maximum_invest,
      percent_of_rebate : req.body.percent_of_rebate,
      minimum_rebate    : req.body.minimum_rebate,
      maximum_rebate    : req.body.maximum_rebate,
      status            : req.body.status,
      update_by         : req.body.update_by,
      update_date       : req.body.update_date,
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


exports.deleteTaxRebatePolicy = async (req, res) => {
    let deleteId = req.params.id;
    
    taxRebateModel.destroy(
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
