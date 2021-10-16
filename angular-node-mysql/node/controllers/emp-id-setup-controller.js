const empIdSetupModel = require('../models/con-emp-id-setup');

exports.getEmpIdSetupList = async (req, res) => {
    empIdSetupModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
        })
};


exports.addEmpIdSetup = async (req, res) => {
        
    const formData = {
        id                : req.body.id,
        company_code      : req.body.company_code,
        auto_generate     : req.body.auto_generate,
        id_length         : req.body.id_length,
        id_prefix         : req.body.id_prefix,
        id_suffix         : req.body.id_suffix,
        sysdate_allow     : req.body.sysdate_allow,
        sysdate_format    : req.body.sysdate_format,
        sysdate_position  : req.body.sysdate_position,
        file_no_allow     : req.body.file_no_allow,
        file_length       : req.body.file_length,
        file_padding_with :  req.body.file_padding_with,
        file_padding_side : req.body.file_padding_side,
        file_position     : req.body.file_position,
        id_padding_allow  : req.body.id_padding_allow,
        id_padding_with   : req.body.id_padding_with,
        id_padding_side   : req.body.id_padding_side,
        insert_by         : req.body.insert_by,
        insert_date       : req.body.insert_date
    };

    empIdSetupModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};


exports.getEmpIdSetupById = async (req, res) => {
  let editId = req.params.id;
  
  empIdSetupModel.findOne(
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


exports.updateEmpIdSetup = async (req, res) => {
    let updatedId = req.params.id;

    empIdSetupModel.update({
      auto_generate     : req.body.auto_generate,
      id_length         : req.body.id_length,
      id_prefix         : req.body.id_prefix,
      id_suffix         : req.body.id_suffix,
      sysdate_allow     : req.body.sysdate_allow,
      sysdate_format    : req.body.sysdate_format,
      sysdate_position  : req.body.sysdate_position,
      file_no_allow     : req.body.file_no_allow,
      file_length       : req.body.file_length,
      file_padding_with :  req.body.file_padding_with,
      file_padding_side : req.body.file_padding_side,
      file_position     : req.body.file_position,
      id_padding_allow  : req.body.id_padding_allow,
      id_padding_with   : req.body.id_padding_with,
      id_padding_side   : req.body.id_padding_side,
      update_by   : req.body.update_by,
      update_date : req.body.update_date 
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


exports.deleteEmpIdSetup = async (req, res) => {
  let deleteId = req.params.id;
  
  empIdSetupModel.destroy(
    { where: {id: deleteId}}
  )
  .then(deletedData => {
        res.json({isExecuted:true, data: deletedData});
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Exam Result is not deleted for : "+ deleteId});
      res.end();
  });
};