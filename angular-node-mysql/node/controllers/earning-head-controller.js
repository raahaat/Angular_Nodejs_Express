const Ehead = require('../models/earning-head-setup-model');

exports.getEarningHeadAll = async (req, res) => {
    Ehead.findAll(  
        {  
        where: {company_code: '200'},
        order: [['headType', 'DESC'],
                ['headCode', 'ASC']]
        }
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};

exports.addEarningType = async (req, res) => {
    
    const formData = {
        id          :        req.body.id,
        company_code:        req.body.company_code,
        headCode:            req.body.headCode,
        headName:            req.body.headName,
        headType:            req.body.headType,
        paymentFrequency:    req.body.paymentFrequency,
        dependsOnAttendance: req.body.dependsOnAttendance,
        calculateOverTime:   req.body.calculateOverTime,
        fixedVariable:       req.body.fixedVariable,
        paymentMode:         req.body.paymentMode,
        printOnPayslip:      req.body.printOnPayslip,
        leaveImpact:         req.body.leaveImpact,
        serialNumber:        req.body.serialNumber,
        bonusCalculation:    req.body.bonusCalculation,
        affectGrossSalary:   req.body.affectGrossSalary,      
        insert_by   :        req.body.insert_by,
        insert_date :        req.body.insert_date 
    };

    Ehead.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getEarningTypeById = async (req, res) => {
  let editId = req.params.id;
  
  Ehead.findOne(
      { where: {headCode : editId}}
    )
  .then(editData => {      
    res.json({isExecuted:true, data: editData, message: "Data Fetch Successfullt."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });  
};

exports.getDupicateById = async (req, res) => {
    let editId = req.params.id;
    
    Ehead.findOne(
        { where: {headCode : editId}}
      )
    .then(editData => {
        if (editData != null){
            res.json({isExecuted:true, data: editData, message: "Duplicate Data Found."});
        }
        else
        {
            res.json({isExecuted:false, message: "No Duplicate Data Found."});
        }
      res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Error to get data."});
      res.end();
    });

    // return res.json({isExecuted:false, message: "Data Fetch Successfullt."});
  };
  

exports.updateEarningType = async (req, res) => {
    let updatedId = req.params.id;

    Ehead.update({
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


exports.deleteEarningType = async (req, res) => {
    let deleteId = req.params.id;
    
    Ehead.destroy(
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