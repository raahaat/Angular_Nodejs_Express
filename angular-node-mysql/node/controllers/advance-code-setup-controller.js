// const addressTypeModel = require('../models/con-address-type');
const advanceCodeSetupModel = require('../models/advance-code-setup-model')

exports.getAdvanceCodeList = async (req, res) => {
  let compCode = '200'
  advanceCodeSetupModel.findAll({
    where: {company_code: compCode}
})
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addAdvanceCode = async (req, res) => {
        
    const formData = {
        id              : req.body.id,
        company_code    : req.body.company_code,
        advanced_code   : req.body.advanced_code,
        code_description: req.body.code_description,
        hard_code       : req.body.hard_code,
        soft_code       : req.body.soft_code,
        account_type    : req.body.account_type,
        link_dd_code    : req.body.link_dd_code,
        insert_by       : req.body.insert_by,
        insert_date     : req.body.insert_date 
    };

    advanceCodeSetupModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getAdvanceCodeById = async (req, res) => {
  let editId = req.params.id;
  
  advanceCodeSetupModel.findOne(
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


exports.countAdvanceCode = async (req, res) => {  
  advanceCodeSetupModel.findAndCountAll({
    where: {
      company_code: '200'
    }
  })
  .then(countData => {
        //res.json({isExecuted:true, data: countData});
        res.json({countData});
        console.log(countData.count);
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Counting Problem..."});
      res.end();
  })
}; 


exports.updateAdvanceCode = async (req, res) => {
    let updatedId = req.params.id;

    advanceCodeSetupModel.update({
      // id              : req.body.id,
      // company_code    : req.body.company_code,
      advanced_code   : req.body.advanced_code,
      code_description: req.body.code_description,
      hard_code       : req.body.hard_code,
      soft_code       : req.body.soft_code,
      account_type    : req.body.account_type,
      link_dd_code    : req.body.link_dd_code,
      update_by       : req.body.update_by,
      update_date     : req.body.update_date 
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


exports.deleteAdvanceCode = async (req, res) => {
    let deleteId = req.params.id;
    
    advanceCodeSetupModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "advance setup is not deleted for : "+ deleteId});
        res.end();
    });    
};


