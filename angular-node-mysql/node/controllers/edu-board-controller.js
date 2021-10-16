const eduBoardModel = require('../models/con-edu-board');

exports.getEduBoardList = async (req, res) => {
  eduBoardModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addEduBoard = async (req, res) => {
        
    const formData = {
      id: req.body.id,      
      company_code: req.body.company_code,
      hard_code   : req.body.hard_code,
      soft_code   : req.body.soft_code,   
      description : req.body.description,
      header      : req.body.header,
      insert_by   : req.body.insert_by,
      insert_date : req.body.insert_date
    };

    eduBoardModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getEduBoardById = async (req, res) => {
  let editId = req.params.id;
  
  eduBoardModel.findOne(
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


exports.updateEduBoard = async (req, res) => {
    let updatedId = req.params.id;

    eduBoardModel.update({
      // id          : req.body.id,
      // company_code: req.body.company_code,
      // hard_code   : req.body.hard_code,
      soft_code   : req.body.soft_code,
      description : req.body.description,
      header      : req.body.header,
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


exports.deleteEduBoard = async (req, res) => {
    let deleteId = req.params.id;
    
    eduBoardModel.destroy(
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

exports.countEduBoard = async (req, res) => {  
  eduBoardModel.findAndCountAll({
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