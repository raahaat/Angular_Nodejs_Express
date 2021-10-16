const extraCurriculumModel = require('../models/con-extra-curriculum');


exports.getExtraCurriculumList = async (req, res) => {
    extraCurriculumModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addExtraCurriculum = async (req, res) => {
        
    const formData = {
        id          : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,   
        description : req.body.description,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date
    };

    extraCurriculumModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getExtraCurriculumById = async (req, res) => {
  let editId = req.params.id;
  
  extraCurriculumModel.findOne(
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


exports.updateExtraCurriculum = async (req, res) => {
    let updatedId = req.params.id;

    extraCurriculumModel.update({
      // id          : req.body.id,
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


exports.deleteExtraCurriculum = async (req, res) => {
    let deleteId = req.params.id;
    
    extraCurriculumModel.destroy(
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

exports.countExtCurriculum = async (req, res) => {  
  extraCurriculumModel.findAndCountAll({
    where: {
      company_code: '200'
    }
  })
  .then(countData => {
        res.json({countData});
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Counting Problem..."});
      res.end();
  })
}; 