const tax108paraModel = require('../models/con-tax-108para');
const earnDeductModel =  require('../models/Earn-deduct-code');


exports.getTax108paraList = async (req, res) => {
  tax108paraModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addTax108para = async (req, res) => {
        
    const formData = {
        id                  : req.body.id,
        company_code        : req.body.company_code,        
        earning_code        : req.body.earning_code,
        earning_name        : req.body.earning_name,      
        sequence_no         : req.body.sequence_no,
        show_allowence      : req.body.show_allowence,
        shown_summery       : req.body.shown_summery,
        report_code         : req.body.report_code,
        inserted_by         : req.body.inserted_by,
        inserted_date       : req.body.inserted_date
      };


    tax108paraModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getTax108paraById = async (req, res) => {
  let editId = req.params.id;
  
  tax108paraModel.findOne(
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


exports.updateTax108para = async (req, res) => {
    let updatedId = req.params.id;
    console.log(req.body);
    tax108paraModel.update({
      id                  : req.body.id,
      company_code        : req.body.company_code,          
      earning_code        : req.body.earning_code,
      earning_name        : req.body.earning_name,      
      sequence_no         : req.body.sequence_no,
      show_allowence      : req.body.show_allowence,
      shown_summery       : req.body.shown_summery,
      report_code         : req.body.report_code,
      updated_by          : req.body.updated_by,
      updated_date        : req.body.updated_date
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


exports.deleteTax108para = async (req, res) => {
    let deleteId = req.params.id;
    
    tax108paraModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Tax 108 is not deleted for : "+ deleteId});
        res.end();
    });
};


exports.getDeductionCode = async (req, res) => {
  earnDeductModel.findAll({
    attributes: [['soft_code', 'code'], 'description']
  })
  .then(getData => { 
      res.json({isExecuted:true, data: getData});
      res.end();     
  })
};
