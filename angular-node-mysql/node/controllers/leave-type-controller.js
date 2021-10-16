const leaveTypeModel = require('../models/con-leave-type');


exports.getLeaveTypeList = async (req, res) => {
    leaveTypeModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addLeaveType = async (req, res) => {
        
    const formData = {
        id          : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,   
        description : req.body.description,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date
    };

    leaveTypeModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getLeaveTypeById = async (req, res) => {
  let editId = req.params.id;
  
  leaveTypeModel.findOne(
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


exports.updateLeaveType = async (req, res) => {
    let updatedId = req.params.id;

    leaveTypeModel.update({
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


exports.deleteLeaveType = async (req, res) => {
    let deleteId = req.params.id;
    
    leaveTypeModel.destroy(
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

exports.countLeaveType = async (req, res) => {  
  //console.log('start');
  leaveTypeModel.findAndCountAll({
    where: {
      company_code: '200'
    }
  })
  .then(countData => {
   // console.log(countData);
        res.json({countData});
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Counting Problem..."});
      res.end();
  })
}; 