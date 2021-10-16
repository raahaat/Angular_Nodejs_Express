const corLeaveMasterModel = require('../models/con-cor-leave-master');
const empMasterModel = require('../models/cor-employee-master');
const notificationModel = require('../models/notification');
const leaveApprovalPersonModel = require('../models/leave-approval-person');
const leaveAprListModel = require('../models/leave-approval');
const leaveRepListModel = require('../models/leave-replacement');
const leaveDetailModel = require('../models/cor-leave-detail');
const leaveCodeModel = require('../models/con-leave-criteria');
const leaveTypeModel = require('../models/con-leave-type');
const designationModel = require('../models/designation-setup-model');
const branchModel = require('../models/branch-master-setup');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');


exports.addLeaveApplication = async (req, res) => {  
    let replacementArray = req.body.replacementArray;
    let approvalArray = req.body.approvalArray;

    await leaveDetailModel.create(req.body)
    .then(()=> {
        if (approvalArray.length > 0) {
          leaveAprListModel.bulkCreate(approvalArray);
        }
        if (replacementArray.length > 0 && replacementArray[0].replacement_id) {
          leaveRepListModel.bulkCreate(replacementArray);
        }
        
        if (replacementArray.length > 0 && replacementArray[0].replacement_id) {
         for (i of replacementArray) {
          let notifyData = {
            company_code: req.body.company_code,
            applicant_id: req.body.employee_code,
            document_date: req.body.apply_date,
            apply_date: req.body.apply_date,
            from_date: req.body.from_date,
            end_date: req.body.end_date,
            notification_type: 'LEVREP',
            notified_to: i.replacement_id,
            status: 'Y',
            created_time: req.body.insert_date? req.body.insert_date : new Date()
        };
        notificationModel.create(notifyData)
        .catch((err)=> {
          console.log('Notify error ', err);
          return res.json({isExecuted: false, message : 'Error to insert in Notification table.'});        
        });
       } 
      } else if (approvalArray.length > 0 && approvalArray[0].approval_id) {
          let notifyData = {
            company_code: req.body.company_code,
            applicant_id: req.body.employee_code,
            document_date: req.body.apply_date,
            apply_date: req.body.apply_date,
            from_date: req.body.from_date,
            end_date: req.body.end_date,
            notification_type: 'LEVAPR',
            notified_to: approvalArray[0].approval_id,
            status: 'Y',
            created_time: req.body.insert_date? req.body.insert_date : new Date()
        };
        notificationModel.create(notifyData)
        .catch((err)=> {
          console.log('Notify error ', err);
          return res.json({isExecuted: false, message : 'Error to insert in Notification table.'});        
        });
      }
      res.json({isExecuted: true, message : 'Successfully apply for leave. Please wait until approval.'});
      res.end();
    }).catch((err)=> {
        res.json({isExecuted: false, message : `Leave apply unsuccessfull. ${err}`});
        res.end();
        console.log('Leave Error:' + err);
    })
};

exports.getDuplicateLeaveApply = async (req, res) => {
 try {
  let companyCode = '200';
  let applyDate = new Date(req.query.apply_date);
  applyDate.setDate(applyDate.getDate()-1); 

  let duplicateCount = 
  await leaveDetailModel.findAll({
    where: {
      company_code: companyCode,
      employee_code: req.query.employee_code,
      apply_date: applyDate,
      leave_status: {[Op.ne]: 'CAN'},
      [Op.or]: [
        {from_date: {[Op.between]: [new Date(req.query.from_date), new Date(req.query.end_date)]} },
        {end_date: {[Op.between]: [new Date(req.query.from_date), new Date(req.query.end_date)]} }
      ]
    }
  })
  if (duplicateCount.length > 0) {
    return res.json({isExecuted: false, data: duplicateCount.length, message: 'Duplicate entry found with this date combination!'});
  } else {
    return res.status(200).json({isExecuted: true, message: 'No duplicate entry found!'});
  }
 } catch(err) {
   return res.json({isExecuted: false, message: 'Error occured when checking duplicate entry!'});
 }

};

exports.getLeaveCodeList = async (req, res) => {
  let companyCode = '200';
  leaveCodeModel.belongsTo(corLeaveMasterModel, {
    foreignKey: "leave_deduct_from",
    targetKey: "leave_code",
  });

  await leaveCodeModel.findAll({
    where: {
     company_code : companyCode
    },
    include:[{model: corLeaveMasterModel, attributes:['leave_name']}]
  })
  .then(getData => {  
       return res.json(getData);  
    })
};

exports.getApprovalPerson = async (req, res) => {
  let applicantId = req.query.applicantId;
  let levelId = req.query.levelId;
  let companyCode = '200';

  leaveApprovalPersonModel.belongsTo(empMasterModel, {
    foreignKey: "employee_code",
    targetKey: "employee_code",
  });

  await leaveApprovalPersonModel.findAll({
    where: {
     company_code : companyCode,
     approval_level: levelId,
     applicant_id: applicantId,     
    },
    include:[{model: empMasterModel, attributes:['employee_name']}]
  })
  .then(list => {   
    return res.json(list)
  })
};

exports.getLeaveData = async (req, res) => {
  let companyCode = '200';
  let empId = req.params.id;

  leaveDetailModel.belongsTo(leaveTypeModel,{ foreignKey:'leave_type_code',targetKey: 'head_code'});
  leaveDetailModel.belongsTo(branchModel,{ foreignKey:'branch_code',targetKey:'branch_code'});
  leaveDetailModel.belongsTo(designationModel,{ foreignKey:'designation_code',targetKey:'designationCode'});        
  leaveDetailModel.belongsTo(empMasterModel,{ foreignKey:'employee_code',targetKey:'employee_code'});

  await leaveDetailModel.findAll({
    where: {
     company_code : companyCode,
     employee_code: empId
    },
    order: [
      ['apply_date', 'DESC']
    ],
    include:[
      {model: leaveTypeModel, attributes:['description']},
      {model: designationModel, attributes:['designationName']},
      {model: branchModel, attributes:['branch_name']},
      {model: empMasterModel, attributes:['employee_name']}
    ]
  })
  .then(getData => {  
       return res.json(getData);  
    })
};

exports.getLeaveBalance = async (req, res) => {
  try {
    let companyCode = '200';
    let empId = req.params.id;
    let leaveBalance = 
      await dbConnect.query(`SELECT a.leave_code, b.leave_name, a.yearly_balance, 
                                    a.leave_avail, (a.yearly_balance - a.leave_avail) balance
                              FROM cor_leave_master a, con_cor_leave_master b
                              WHERE a.company_code = '${companyCode}'
                                AND a.company_code = b.company_code
                                AND a.leave_code = b.leave_code
                                AND a.employee_code = '${empId}'`, 
                            {type: QueryTypes.SELECT})
    return res.json(leaveBalance);  
  } catch(err) {
    console.log(err);
  }
};


exports.getSingleLeaveById = async (req, res) => {
  try {
    let editId = req.params.id;
    let companyCode = '200';
    
    let leaveDetails =
      await leaveDetailModel.findOne(
          { where: {id: editId}}
        )

    let leaveAprData = 
     await leaveAprListModel.findAll(
     { where: {
           company_code: companyCode,
           applicant_id: leaveDetails.employee_code,
           apply_date: leaveDetails.apply_date,
           from_date: leaveDetails.from_date,
           end_date: leaveDetails.end_date,
           approval_flag: {[Op.or]: ['', null]} 
         }
     })
    
     let leaveRepData = 
     await leaveRepListModel.findAll(
     { where: {
           company_code: companyCode,
           applicant_id: leaveDetails.employee_code,
           apply_date: leaveDetails.apply_date,
           from_date: leaveDetails.from_date,
           end_date: leaveDetails.end_date,
           replacement_flag: {[Op.or]: ['', null]} 
         }
     })
   
    return res.json({editData: leaveDetails,leaveAprData, leaveRepData}); 

  } catch (err) {
    console.log(err);
    return res.json({isExecuted:false, message: "Error to get data."});
  }
    
};


exports.updateSingleLeave = async (req, res) => {
    let updatedId = req.params.id;

  await leaveDetailModel.update({
      leave_type_code: req.body.leave_type_code,
      leave_code: req.body.leave_code,
      apply_date: req.body.apply_date,
      from_date: req.body.from_date,
      end_date: req.body.end_date,
      leave_purpose: req.body.leave_purpose,
      address_on_leave: req.body.address_on_leave,
      tel_mobile: req.body.tel_mobile,
      lfa_flag: req.body.lfa_flag,
      lfa_leave_avail: req.body.lfa_leave_avail,
      foreign_flag: req.body.foreign_flag,
      country_name: req.body.country_name,
      replacement1_code: req.body.replacement1_code,
      rep1_opinion_flag: req.body.rep1_opinion_flag,
      rep1_opinion_date: req.body.rep1_opinion_date,
      replacement2_code: req.body.replacement2_code,
      rep2_opinion_flag: req.body.rep2_opinion_flag,
      rep2_opinion_date: req.body.rep2_opinion_date,
      leave_status: req.body.leave_status,
      leave_remarks: req.body.leave_remarks,
      approver1_code: req.body.approver1_code,
      appr1_opinion_flag: req.body.appr1_opinion_flag,
      appr1_opinion_date: req.body.appr1_opinion_date,
      approver2_code: req.body.approver2_code,
      appr2_opinion_flag: req.body.appr2_opinion_flag,
      appr2_opinion_date: req.body.appr2_opinion_date,
      update_by: req.body.update_by,
      update_date: req.body.update_date}, 
        {where: {id: updatedId}}
      ).then((updated)=> {
        return res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + req.body.employee_code});
      })
      .catch (err => {
      return res.json({isExecuted:false, message:"Unknown Error: "+ err});
      })
};


// exports.deleteLeaveType = async (req, res) => {
//     let deleteId = req.params.id;
    
//     leaveTypeModel.destroy(
//       { where: {id: deleteId}}
//     )
//     .then(deletedData => {
//           res.json({isExecuted:true, data: deletedData});
//           res.end();
//         })
//       .catch(err => {
//         res.json({isExecuted:false, message: "Division Zone is not deleted for : "+ deleteId});
//         res.end();
//     });
// };
