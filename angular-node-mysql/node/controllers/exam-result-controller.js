const examResultModel = require('../models/con-exam-result');

exports.getExamResultList = async (req, res) => {
  examResultModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};


exports.addExamResult = async (req, res) => {
        
    const formData = {
        id          : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,
        description : req.body.description,
        min_point   : req.body.min_point,
        max_point   : req.body.max_point,
        ranking     : req.body.ranking,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date 
    };

    examResultModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};


exports.getExamResultById = async (req, res) => {
  let editId = req.params.id;
  
  examResultModel.findOne(
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


exports.updateExamResult = async (req, res) => {
    let updatedId = req.params.id;

    examResultModel.update({
      // id          : req.body.id,
      // company_code: req.body.company_code,
      // hard_code   : req.body.hard_code,
      soft_code   : req.body.soft_code,
      description : req.body.description,
      min_point   : req.body.min_point,
      max_point   : req.body.max_point,
      ranking     : req.body.ranking,
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


exports.deleteExamResult = async (req, res) => {
    let deleteId = req.params.id;
    
    examResultModel.destroy(
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
