const addressTypeModel = require('../models/con-address-type');

exports.getAddressTypeList = async (req, res) => {
    addressTypeModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addAddressType = async (req, res) => {
        
    const formData = {
        id          : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,
        description : req.body.description,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date 
    };

    addressTypeModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getAddressTypeById = async (req, res) => {
  let editId = req.params.id;
  
  addressTypeModel.findOne(
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


exports.updateAddressType = async (req, res) => {
    let updatedId = req.params.id;

    addressTypeModel.update({
      // id          : req.body.id,
      // company_code: req.body.company_code,
      // hard_code   : req.body.hard_code,
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


exports.deleteAddressType = async (req, res) => {
    let deleteId = req.params.id;
    
    addressTypeModel.destroy(
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

exports.countAddressType = async (req, res) => {  
  addressTypeModel.findAndCountAll({
    where: {
      company_code: '200'
    }
  })
  .then(countData => {
        //res.json({isExecuted:true, data: countData});
        res.json({countData});
        //console.log(countData.count);
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Counting Problem..."});
      res.end();
  })
}; 
