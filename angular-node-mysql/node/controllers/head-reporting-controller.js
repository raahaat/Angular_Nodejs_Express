const headReportingModel = require('../models/con-head-reporting');

exports.getHeadReportingList = async (req, res) => {
  headReportingModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addHeadReporting = async (req, res) => {
        
    const formData = {
        id              : req.body.id,
        company_code    : req.body.company_code,        
        division_code   : req.body.division_code,
        effective_date  : req.body.effective_date,
        expire_date     : req.body.expire_date,
        employee_code   : req.body.employee_code,
        report_header   : req.body.report_header,
        insert_by       : req.body.insert_by,
        insert_date     : req.body.insert_date,
    };

    headReportingModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getHeadReportingById = async (req, res) => {
  let editId = req.params.id;
  
  headReportingModel.findOne(
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


exports.updateHeadReporting = async (req, res) => {
    let updatedId = req.params.id;

    headReportingModel.update({
      id              : req.body.id,     
      division_code   : req.body.division_code,
      effective_date  : req.body.effective_date,
      expire_date     : req.body.expire_date,
      employee_code   : req.body.employee_code,
      report_header   : req.body.report_header,
      update_by       : req.body.update_by,
      update_date     : req.body.update_date,
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


exports.deleteHeadReporting = async (req, res) => {
    let deleteId = req.params.id;
    
    headReportingModel.destroy(
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
