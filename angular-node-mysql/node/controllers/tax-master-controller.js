const taxMasterModel = require('../models/con-tax-master');
const earnDeductModel =  require('../models/earning-head-setup-model');


exports.getTaxMasterList = async (req, res) => {
  taxMasterModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addTaxMaster = async (req, res) => {
        
    const formData = {
        id                  : req.body.id,
        company_code        : req.body.company_code,        
        effective_date      : req.body.effective_date,
        expire_date         : req.body.expire_date,      
        tax_class           : req.body.tax_class,
        yearly_min_tax      : req.body.yearly_min_tax,
        yearly_max_tax      : req.body.yearly_max_tax,
        rebate_calc         : req.body.rebate_calc,
        actual_tax_calc     : req.body.actual_tax_calc,
        tax_head_code       : req.body.tax_head_code,
        tax_on_arrear       : req.body.tax_on_arrear,
        arrear_calc_method  : req.body.arrear_calc_method,
        status              : req.body.status,
        insert_by           : req.body.insert_by,
        insert_date         : req.body.insert_date,
    };

    taxMasterModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getTaxMasterById = async (req, res) => {
  let editId = req.params.id;
  
  taxMasterModel.findOne(
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


exports.updateTaxMaster = async (req, res) => {
    let updatedId = req.params.id;

    taxMasterModel.update({
      id                  : req.body.id,     
      effective_date      : req.body.effective_date,
      expire_date         : req.body.expire_date,      
      tax_class           : req.body.tax_class,
      yearly_min_tax      : req.body.yearly_min_tax,
      yearly_max_tax      : req.body.yearly_max_tax,
      rebate_calc         : req.body.rebate_calc,
      actual_tax_calc     : req.body.actual_tax_calc,
      tax_head_code       : req.body.tax_head_code,
      tax_on_arrear       : req.body.tax_on_arrear,
      arrear_calc_method  : req.body.arrear_calc_method,
      status              : req.body.status,
      update_by           : req.body.update_by,
      update_date         : req.body.update_date,
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


exports.deleteTaxMaster = async (req, res) => {
    let deleteId = req.params.id;
    
    taxMasterModel.destroy(
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


exports.getDeductionCode = async (req, res) => {
  earnDeductModel.findAll({
    attributes: [['headCode', 'code'], ['headName','description']],
    where: {headType: 'DD'}
  })
  .then(getData => { 
      res.json({isExecuted:true, data: getData});
      res.end();     
  })
};
