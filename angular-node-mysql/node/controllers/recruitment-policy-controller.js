const vacancyModel = require('../models/stg-vacancy');
const recruitModel = require('../models/recruit-policy');
const educationModel = require('../models/con-com-edu-level');
const instituteModel = require('../models/institute');
const designationModel = require('../models/designation-setup-model');
const subjectModel = require('../models/con-com-subject');
const prfInstModel = require('../models/stg-pref-institute-model');
const prfDesignation = require('../models/stg_pref_designation');
const prfSubject = require('../models/stg_pref_subject');

exports.getVacancyList = async (req, res) => {
 await vacancyModel.findAll({
    where: {company_code: '200'}
  }).then((getData) => {  
    return res.json(getData);   
  })
};

exports.getEducationList = async (req, res) => {
  await educationModel.findAll({
     where: {company_code: '200'}
   }).then((getData) => { 
     return res.json(getData);   
   })
 };

 exports.getInstituteData = async (req, res) => {
  instituteModel.findAll(
        {where: {pycomcde: '200'}}
    ).then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.getDesignationData = async (req, res) => {
  designationModel.findAll(
        {where: {company_code: '200'}}
    ).then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};

exports.getSujectData = async (req, res) => {
  subjectModel.findAll(
        {where: {company_code: '200'}}
    ).then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};
//  exports.getInstituteData = async (req, res) => {
//   await instituteModel.findAll({
//      where: {Pycomcde: '200'}
//    }).then((getData) => {  
//      return res.json(getData);   
//    })
//  };

exports.addPolicyList = async (req, res) => {        
  let formData=req.body;
  let policyId;  
  let insArray = req.body.times;
  let desigArray=req.body.desinationArray;
  let subArray=req.body.subjectArray;

  recruitModel.create(formData)
  .then((data)=> {
    policyId = data.policy_id;

    insArray.map(data => {
      data.policy_id = policyId;
    });
    
    desigArray.map(data => {
      data.policy_id = policyId;
    });
    subArray.map(data => {
      data.policy_id = policyId;
    });
    if ([insArray].length !=0){
    prfInstModel.bulkCreate(insArray)
    .then((data) => {
      res.json({message : 'Successfully inserted.'});
      res.end();
    })
    .catch((err)=> {
      console.log('error');
    })
  }
    prfDesignation.bulkCreate(desigArray)
    .then((data) => {
      res.json({message : 'Successfully inserted.'});
      res.end();
    })
    .catch((err)=> {
      console.log('error');
    })
   
    prfSubject.bulkCreate(subArray)
    .then((data) => {
      res.json({message : 'Successfully inserted.'});
      res.end();
    })
    .catch((err)=> {
      console.log('error');
    })
    res.json({message : 'Successfully inserted.'});
    res.end();
  }).catch((err)=> {
      console.log('Error');
  });
  
  

};


// exports.addReportParams = async (req, res) => {
//   let reportId;
//   let paramArray = req.body.times;

//   const reportData = {
//     compcode  : req.body.company_code,
//     parentId  : req.body.parent_id,
//     reportname: req.body.report_name,
//     reportserl: req.body.report_srl,
//     createby  : req.body.insert_by,
//     createdt  : req.body.insert_date    
//   };

//   await menuReportModel.create(reportData)
//   .then((data)=> {
//     reportId = data.id;

//     paramArray.map(data => {
//       data.report_id = reportId;
//     });

//     paramsSetupModel.bulkCreate(paramArray)
//     .then((data) => {
//       res.json({message : 'Successfully inserted.'});
//       res.end();
//     })
//     .catch((err)=> {
//       console.log('error');
//     })
//   }) 
// };


exports.viewPolicyList = async (req, res) => {
  try {
    let getData =
    await recruitModel.findAll({
      where: {company_code: '200'}
    })
    return res.json(getData);  
  } catch (err) {
    console.log(err);
  } 
 };

 