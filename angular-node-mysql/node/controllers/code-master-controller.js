const codeMasterModel = require('../models/con-code-master');


exports.getCodeHeader = async (req, res) => {
  let companyCode = '200';
  
  codeMasterModel.findAll({
    attributes: ['soft_code', 'description'],   
    where: {
      company_code: companyCode,
      hard_code: 'XX'
    },
    order: [
      ['description', 'ASC'],
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getCodeHeaderDesc = async (req, res) => {
  let companyCode = '200';
  let headCode = req.params.code;
  console.log(headCode);
  
  codeMasterModel.findOne({
    attributes: ['description'],   
    where: {
      company_code: companyCode,
      hard_code: 'XX',
      soft_code: headCode
    }
  })
  .then(getData => { 
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};


exports.getCodeMaster = async (req, res) => {
  let comCode = '200';
  let hardCode = req.params.headCode;
  
  codeMasterModel.findAll( { 
    where: {
      company_code: comCode,
      hard_code: hardCode
    },
    order: [
      ['serial_no', 'ASC'],
      ['description', 'ASC'],
    ]
  })
  .then(editData => {
    res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};


exports.addCodeMaster = async (req, res) => {
   
  // console.log(req.body.times);
  for(let val of req.body.times) { 

    const formData = {
      company_code  : req.body.company_code,
      hard_code     : req.body.hard_code,
      soft_code     : val.soft_code,
      code          : val.code,
      description   : val.description,
      header        : val.header,
      serial_no     : val.serial_no,
      insert_by     : req.body.insert_by,
      insert_date   : req.body.insert_date 
    };

    if (val) {
      codeMasterModel.create(formData)
      .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();

      }).catch((err)=> {
        console.log('error');
      })
    }
      
  } //loop end
};



exports.getCodeMasterById = async (req, res) => {
  let editId = req.params.id;
  
  codeMasterModel.findOne(
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


exports.updateCodeMaster = async (req, res) => {
    let updatedId = req.params.id;

    codeMasterModel.update({
      // id          : req.body.id,
      soft_code   : req.body.soft_code,
      description : req.body.description,
      header      : req.body.header,
      serial_no   : req.body.serial_no,
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


exports.deleteCodeMaster = async (req, res) => {
    let deleteId = req.params.id;
    
    codeMasterModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Company List is not deleted for : "+ deleteId});
        res.end();
    });
};