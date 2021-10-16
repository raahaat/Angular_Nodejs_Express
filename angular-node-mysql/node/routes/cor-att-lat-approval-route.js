const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const lateApprovalModel = require('../models/cor-att-lat-approval');
const outDutyModel = require('../models/cor-outstation-duty-model');
const empMasterModel = require('../models/cor-employee-master');
router.use(cors());

router.post('/corattlatapproval/add', (req, res) => {        
lateApprovalModel.create(req.body)
    .then((data)=> {
      return res.json({isExecuted: true, message : 'Successfully inserted.'});      
    }).catch((err)=> {
        console.log('Error');
        return res.json({isExecuted: false, message : 'Insert fail !!!'});        
    })
});


router.get('/corattlatapproval/list/approval/:id', async (req, res) => {
 try {
 let userId = req.params.id;
 let companyCode = '200';  
 let approvalList = 
  await dbConnect.query(`SELECT a.IDNO id, a.employee_code, a.apply_date, a.late_att_date as absent_from, 
                                late_att_date AS absent_to, a.approval_type, 
                                (Case When a.reason_type = 'OFFICE' Then 'Office Purpose' 
                                    When a.reason_type = 'PERSONAL' Then 'Personal Purpose' Else Null End) reason_type , a.reason, 
                                a.remarks, a.approver_comment, b.employee_name, 'LATE' Apply_type
                           FROM cor_att_lat_approval a, cor_employee_master b
                          WHERE a.company_code = '200' 
                            AND a.company_code = b.company_code
                            AND a.employee_code = b.employee_code 
                            AND a.approval_emp_id = '${userId}'
                            AND (a.approval_status is null or a.approval_status = '')
                          Union All
                         SELECT a.id, a.employee_code, a.apply_date, absent_from, 
                                absent_to, c.description apply_for, '', d.description reason, 
                                remark, approver_comment, b.employee_name, 'DUTY' 
                           FROM cor_outstation_duty a,cor_employee_master b,  
                                con_code_master c, con_code_master d 
                          WHERE a.company_code = '${companyCode}' 
                            AND a.company_code = b.company_code
                            AND a.company_code = c.company_code
                            AND a.company_code = d.company_code
                            And a.employee_code = b.employee_code
                            AND c.hard_code = 'AB'
                            AND d.hard_code = 'RE'
                            AND a.apply_for = c.code  
                            AND a.reason = d.code
                            AND a.approver_code = '${userId}'
                            AND a.apply_status = 'RAS'`, {type: QueryTypes.SELECT})

  return res.json({isExecuted:true, data: approvalList});
 } catch (err) {
   console.log(err);
   return res.json({isExecuted:false,'message': 'Error to get data!'});
 }
  
});

router.get('/corattlatapproval/userdata/:comp/:emp', (req, res) => {
  let searchuser = req.params.emp;
  let com_code = req.params.comp;

  lateApprovalModel.belongsTo(empMasterModel, {
    foreignKey: "employee_code",
    targetKey: "employee_code",
  })
  
  lateApprovalModel.findAll({ 
    where: {
      employee_code: searchuser,
      company_code: com_code
    },
    include:[{model: empMasterModel, attributes:['employee_name']}],
    order: [
      ['late_att_date','DESC']
    ]
  })
  .then(getData => {  
      res.json({isExecuted:true, data: getData});
      res.end();     
  })
});


router.get('/corattlatapproval/list/:id', (req, res) => {
  let searchId = req.params.id;

  lateApprovalModel.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/corattlatapproval/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    lateApprovalModel.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Late attendance approval is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/corattlatapproval/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  lateApprovalModel.update(
    { late_att_date: req.body.late_att_date,
      approval_type: req.body.approval_type,
      reason: req.body.reason,
      remarks: req.body.remarks,   
      update_by: req.body.update_by,
      update_date: req.body.update_date
    },
    {where: {IDNO: updatedId}}
  )
  .then(updateData => {
    res.json({message : 'Successfully Updated.'});
    res.end();
  })
  .catch(err => {
    res.json({isExecuted:false, message: "Late attendance approval is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router