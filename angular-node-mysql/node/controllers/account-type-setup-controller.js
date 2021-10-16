const accountTypeSetupModel = require('../models/account-type-setup-model')

exports.getAccountTypeList = async (req, res) => {
  let compCode = '200'
  accountTypeSetupModel.findAll({
    where: {company_code: compCode}
})
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addAccountType = async (req, res) => {
        
    const formData = {
        id              : req.body.id,
        company_code    : req.body.company_code,
        hard_code       : req.body.hard_code,
        soft_code       : req.body.soft_code,
        code_description: req.body.code_description,
        account_type_code: req.body.account_type_code,
        account_gl_code : req.body.account_gl_code,
        depend_code     : req.body.depend_code,
        insert_by       : req.body.insert_by,
        insert_date     : req.body.insert_date 
    };

    accountTypeSetupModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getAccountTypeById = async (req, res) => {
  let editId = req.params.id;
  
  accountTypeSetupModel.findOne(
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


// exports.countAdvanceCode = async (req, res) => {  
//   advanceCodeSetupModel.findAndCountAll({
//     where: {
//       company_code: '200'
//     }
//   })
//   .then(countData => {
//         //res.json({isExecuted:true, data: countData});
//         res.json({countData});
//         console.log(countData.count);
//         res.end();
//       })
//     .catch(err => {
//       res.json({isExecuted:false, message: "Counting Problem..."});
//       res.end();
//   })
// }; 


exports.updateAccountType = async (req, res) => {
    let updatedId = req.params.id;
    console.log(req.body);
    accountTypeSetupModel.update({
      // id              : req.body.id,
      // company_code    : req.body.company_code,
      hard_code       : req.body.hard_code,
      soft_code       : req.body.soft_code,
      code_description: req.body.code_description,
      account_type_code: req.body.account_type_code,
      account_gl_code : req.body.account_gl_code,
      depend_code     : req.body.depend_code,
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


exports.deleteAccountType = async (req, res) => {
    let deleteId = req.params.id;
    
    accountTypeSetupModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Account Type is not deleted for : "+ deleteId});
        res.end();
    });    
};


