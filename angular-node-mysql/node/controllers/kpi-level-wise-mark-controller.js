const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const kpiAcademicModel = require('../models/kpi-academic-qualification');
const kpiProfessionalModel = require('../models/kpi-professional-qualification');
const kpiExperienceModel = require('../models/kpi-experience');
const kpiExperience = require('../models/kpi-experience');
const companyCode = '200';

exports.addAcademicQualification = async (req, res) => {
 try {
   await kpiAcademicModel.bulkCreate(req.body)
   return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Error to insert for: " + err });
  }
};

exports.addProfessionalQualification = async (req, res) => {
  try {
    await kpiProfessionalModel.bulkCreate(req.body)
    return res.json({isExecuted:true, message:"Successfully inserted!"});
   } catch (err) {
     return res.json({ isExecuted: false, message: "Error to insert for: " + err });
   }
 };

 exports.addExperienceQualification = async (req, res) => {
  try {
    await kpiExperienceModel.bulkCreate(req.body)
    return res.json({isExecuted:true, message:"Successfully inserted!"});
   } catch (err) {
     return res.json({ isExecuted: false, message: "Error to insert for: " + err });
   }
 }

 exports.checkDuplicateForUpdate = async (req, res) => {
  try{
    let getId = req.body[0];
    let getType = req.body[1];
    let forUpdate = req.body[2];

    if (getType === 'academic') {
      let edu_level = forUpdate['edu_level'];
      await kpiAcademicModel.findAll({
        where: {
          id: { [Op.ne]: getId },
          company_code: companyCode,
          edu_level: edu_level
        } 
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "Duplicate entry found in database table!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
    } else if (getType === 'professional') {
      let diploma = forUpdate['diploma'];
      await kpiProfessionalModel.findAll({
        where: {
          id: { [Op.ne]: getId },
          company_code: companyCode,
          diploma: diploma
        } 
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "Duplicate entry found in database table!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
    } else if (getType === 'experience') {
      await kpiExperienceModel.findAll({
        where: {
          id: { [Op.ne]: getId },
          company_code: companyCode,
        } 
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "Duplicate entry found in database table!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
    }
  } catch (err) {
    console.log(err);
  }
 } 

 exports.checkAcademiDuplicate = async (req, res) => {
  try{
      await kpiAcademicModel.findAll({
        where: {
          company_code: companyCode,
          edu_level: req.body.edu_level
        }
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "Duplicate entry found in database table!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
  } catch(error) {
    console.log(error);
    return res.json({ isExecuted: false, message: "Error occured to find data in table!"});
  }
}

exports.checkProfessionalDuplicate = async (req, res) => {

  try{
      await kpiProfessionalModel.findAll({
        where: {
          company_code: companyCode,
          diploma: req.body.diploma
        }
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "Duplicate entry found in database table!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
  } catch(error) {
    console.log(error);
    return res.json({ isExecuted: false, message: "Error occured to find data in table!"});
  }
}

exports.checkExperienceDuplicate = async (req, res) => {
  try{
      await kpiExperienceModel.findAll({
        where: {
          company_code: companyCode
        }
      }).then((data)=> {
        if (data.length > 0) {
          return res.json({ isExecuted: false, message: "You can insert only one row that already exists!"});
        } else {
          return res.json({ isExecuted: true});
        }
      })
  } catch(error) {
    console.log(error);
    return res.json({ isExecuted: false, message: "Error occured to find data in table!"});
  }
}

exports.getKpiLevelWiseData = async (req, res) => {
 try {
   let kpiAcademic = 
   await dbConnect.query(`SELECT a.id, a.company_code, edu_level, 
                                 (SELECT description FROM con_com_edu_level 
                                   WHERE company_code = a.company_code 
                                     AND concat(hard_code,soft_code) = a.edu_level) edu_level_name,
                                  mark, hons_flag 
                             FROM kpi_academic_qualification a
                            WHERE company_code = '${companyCode}'`, 
                   {type: QueryTypes.SELECT})

   let kpiProfessional = 
   await dbConnect.query(`SELECT a.id, a.company_code,  a.diploma, 
                                 (SELECT examName FROM con_exams WHERE company_code = a.company_code AND examCode = a.diploma ) diploma_name,
                                 a.result, mark 
                            FROM kpi_professional_qualification a
                           WHERE company_code = '${companyCode}'`, 
                   {type: QueryTypes.SELECT})

   let kpiExperience = 
   await dbConnect.query(`SELECT a.id, a.company_code, per_year,
                                 (CASE WHEN calculation_on='Y' THEN 'Yearly' WHEN calculation_on = 'H' THEN 'Half-Yearly' ELSE null END ) calculation_on,
                                mark, max_mark , same_designation 
                            FROM kpi_experience a
                           WHERE company_code = '${companyCode}'`, 
                   {type: QueryTypes.SELECT})
                   
    return res.json({ isExecuted: true, kpiAcademic, kpiProfessional, kpiExperience});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};

exports.getKpiDataForUpdate = async (req, res) => {
  try {
    let getId = req.query.id;
    let getType = req.query.type;

    if (getType === 'academic') {
      await kpiAcademicModel.findOne({
        where: {
          id: getId
        } 
      }).then((academic)=> {
        return res.json(academic)
      })
    } else if (getType === 'professional') {
      await kpiProfessionalModel.findOne({
        where: {
          id: getId
        } 
      }).then((prof)=> {
        return res.json(prof)
      })
    } else if (getType === 'experience') {
      await kpiExperienceModel.findOne({
        where: {
          id: getId
        } 
      }).then((exp)=> {
        return res.json(exp)
      })
    }
  } catch (err) {
    console.log(err);
  }
}


exports.deleteKpiAcademic = async (req, res) => {
  try {
  let deleteId = req.params.id;
  kpiAcademicModel.destroy(
      { where: {id: deleteId}})
          
    return res.json({isExecuted:true, message: "Data deleted successfully."});
    } catch (err) {
      console.log(err);
      return res.json({isExecuted:false, message: "Error to delete data!"});
    }
 };

exports.deleteKpiProfessional = async (req, res) => {
  try {
  let deleteId = req.params.id;
  kpiProfessionalModel.destroy(
      { where: {id: deleteId}})

    return res.json({isExecuted:true, message: "Data deleted successfully."});
    } catch (err) {
      console.log(err);
      return res.json({isExecuted:false, message: "Error to delete data!"});
    }
 };

exports.deleteKpiExperience = async (req, res) => {
  try {
  let deleteId = req.params.id;
  kpiExperienceModel.destroy(
      { where: {id: deleteId}})

    return res.json({isExecuted:true, message: "Data deleted successfully."});
    } catch (err) {
      console.log(err);
      return res.json({isExecuted:false, message: "Error to delete data!"});
    }
 };

 exports.updateKpiLevelMark = async (req, res) => {
  let updatedId = req.params.id;
  let getType = req.body[1];
  let forUpdate = req.body[0];

  try {
    if (getType === 'academic') {
      await kpiAcademicModel.update(forUpdate, 
        {where: {id: updatedId}}
      )
      .then(()=> {
       return res.json({isExecuted:true, message:"Successfully Updated Data"});
      })
    } else if (getType === 'professional') {
      await kpiProfessionalModel.update(forUpdate, 
        {where: {id: updatedId}}
      )
      .then(()=> {
       return res.json({isExecuted:true, message:"Successfully Updated Data"});
      })
    } else if (getType === 'experience') {
      await kpiExperienceModel.update(forUpdate, 
        {where: {id: updatedId}}
      )
      .then(()=> {
       return res.json({isExecuted:true, message:"Successfully Updated Data"});
      })
    }
    // variableModel.update({
    //   company_code        : req.body.company_code,
    //   employee_code       : req.body.employee_code,
    //   process_month       : req.body.process_month,
    //   process_year        : req.body.process_year,
    //   branch              : req.body.branch,
    //   transaction_code    : req.body.transaction_code,
    //   salary_head         : req.body.salary_head,
    //   working_hour        : req.body.working_hour,
    //   amount              : req.body.amount,
    //   percent             : req.body.percent,
    //   naration            : req.body.naration,
    //   reference           : req.body.reference,
    //   process_flag        : req.body.process_flag,
    //   update_by           : req.body.update_by,
    //   update_date         : new Date()
    // }, {where: {id: updatedId}}
    // )
    // .then((updated)=> {
    //   res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + empId});
    //   res.end();
    // })
    // .catch (err => {
    //   res.json({isExecuted:false, message:"Unknown Error: "+ err});
    //   res.end();
    // })
   } catch (err) {
     return res.json({ isExecuted: false, message: "Unknown Error: " + err });
   }
 };


// exports.getSingleTransaction = async (req, res) => {
//  let infoId = req.params.id;
//  try {
//   variableModel.findAll({
//     where: { 
//       id: infoId
//     }
//   })
//   .then(getData => {  
//      return res.send(getData);
//   })
//   } catch (err) {
//     return res.json({ isExecuted: false, message: "Unknown Error: " + err });
//   }
// };

 
