const vacancyModel = require('../models/stg-vacancy');




exports.addVacancy = async (req, res) => {
        
    let formData=req.body;
    
    vacancyModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    });
};


exports.getVacancyList = async (req, res) => {
 await vacancyModel.findAll({
    where: {company_code: '200'}
  }).then(getData => {  
    return res.json(getData);
    res.end();     
      })
};

exports.getVacanyById = async (req, res) => {
  try {
  let editId = req.params.id;
  vacancyModel.findOne(
      { where: {id: editId}}
    ).then((data)=> {
      return res.json(data)
    })
  } catch (err) {
    console.log(err);
  }  
};

exports.updateVacancyType = async (req, res) => {
  let updatedId = req.params.id;

  vacancyModel.update({
     id          : req.body.id,
     company_code: req.body.company_code,
     hard_code   : req.body.hard_code,
    soft_code   : req.body.soft_code,
    description : req.body.description,
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

exports.deleteVacancyType = async (req, res) => {
  let deleteId = req.params.id;
  
  vacancyModel.destroy(
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
