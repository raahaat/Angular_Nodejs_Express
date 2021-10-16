const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const kpiMarkSetupModel = require('../models/kpi-mark-setup');
const kpiMarkDetailsModel = require('../models/kpi-mark-details');
const companyCode = '200';

exports.addKpiMarkSetup = async (req, res) => {
  let formData = req.body[0]
  let arrayData = req.body[1]
  console.log(formData);
  console.log(arrayData);

 try {
   await kpiMarkSetupModel.create(formData)
      .then(()=> {
        kpiMarkDetailsModel.bulkCreate(arrayData)
      })
   return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};

exports.getMaxGroupCode = async (req, res) => {
  try {
  kpiMarkSetupModel.max('kpi_code')
      .then(maximumVal => {
         if (maximumVal !== 0) {
          const maxValue = ((Number(maximumVal.substr(2))+1).toString()).padStart(3, '0');
          res.json(maxValue);
          res.end();    
        } else {
          const maxValue = (Number(1).toString()).padStart(3, '0');
          res.json(maxValue);
          res.end();   
        } 
  }) 
} catch (err) {
  console.log(err);
  res.json({isExecuted:false, message: 'Error: ' + err});
  res.end(); 
}

};


exports.getKpiMarkDetails = async (req, res) => {
  let companyCode = '200'
  try{
   let kpiMark =   
     await dbConnect.query(`SELECT a.kpi_code, b.parent_name, 
                                  (CASE WHEN b.parent_name = 'AM001' THEN 'KPI Mark' 
                                        WHEN b.parent_name = 'AM002' THEN 'Organizational Behaviour'
                                        WHEN b.parent_name = 'AM003' THEN 'Personal Behaviour'
                                        ELSE null END) parent_desc,
                                  b.total_mark, a.category_from, a.category_to,
                                      a.designation_from, a.designation_to, 
                                      a.functional_designation, a.fun_designation_flag, a.branch_type
                              FROM kpi_mark_setup a, kpi_mark_details b
                             WHERE a.company_code = b.company_code
                               AND a.kpi_code = b.kpi_code
                             ORDER by a.kpi_code, b.parent_name`
                  , {type: QueryTypes.SELECT})     
   return res.json(kpiMark);
  } catch (err) {
      console.log(err);
  }
}


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


// exports.deleteVariable = async (req, res) => {
//   let deleteId = req.params.id;
//   variableModel.destroy(
//       { where: {id: deleteId}}
//     )
//     .then(deletedData => {
//           res.json({isExecuted:true, message: "Data deleted successfully."});
//           res.end();
//         })
//       .catch(err => {
//         res.json({isExecuted:false, message: "Data is not deleted "});
//         res.end();
//       });
//  };

 
// exports.updateVariable = async (req, res) => {
//   let updatedId = req.params.id;
//   let empId = req.body.employee_code;
//   try {
//     variableModel.update({
//       company_code        : req.body.company_code,
//       employee_code       : req.body.employee_code,
//       process_month       : req.body.process_month,
//       process_year        : req.body.process_year,
//       branch              : req.body.branch,
//       transaction_code    : req.body.transaction_code,
//       salary_head         : req.body.salary_head,
//       working_hour        : req.body.working_hour,
//       amount              : req.body.amount,
//       percent             : req.body.percent,
//       naration            : req.body.naration,
//       reference           : req.body.reference,
//       process_flag        : req.body.process_flag,
//       update_by           : req.body.update_by,
//       update_date         : new Date()
//     }, {where: {id: updatedId}}
//     )
//     .then((updated)=> {
//       res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + empId});
//       res.end();
//     })
//     .catch (err => {
//       res.json({isExecuted:false, message:"Unknown Error: "+ err});
//       res.end();
//     })
//    } catch (err) {
//      return res.json({ isExecuted: false, message: "Unknown Error: " + err });
//    }
//  };
