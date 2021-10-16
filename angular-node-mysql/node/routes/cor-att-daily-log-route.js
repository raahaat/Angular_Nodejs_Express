const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

router.use(cors());

const dailyLogModel = require('../models/cor-att-daily-log');
const lateApprovalModel = require('../models/cor-att-lat-approval');
const outstationDutyModel = require('../models/cor-outstation-duty-model');


router.post('/corattdailylog/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        employee_code: req.body.employee_code,
        attendance_date: req.body.attendance_date,
        att_intime: req.body.att_intime,
        att_outtime: req.body.att_outtime,
        late_flag: req.body.late_flag,
        early_exit_flag: req.body.early_exit_flag,
        late_apr_flag: req.body.late_apr_flag,
        early_exit_apr_flag: req.body.early_exit_apr_flag,
        approval_emp_id: req.body.approval_emp_id,
        approval_date: req.body.approval_date,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };
/*      
        
*/
dailyLogModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/corattdailylog/list', (req, res) => {
  dailyLogModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/corattdailylog/userdata/:comp/:emp', (req, res) => {
  let searchuser = req.params.emp;
  let com_code = req.params.comp;

  dailyLogModel.findAll(
    { where: {
            employee_code: searchuser,
            company_code:  com_code
            }
    }
  )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


router.get('/corattdailylog/list/:id', (req, res) => {
  let searchId = req.params.id;

  dailyLogModel.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/corattdailylog/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    dailyLogModel.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Daily attendance is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/corattdailylog/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  dailyLogModel.update(
    { attendance_date: req.body.attendance_date,
      att_intime: req.body.att_intime,
      att_outtime: req.body.att_outtime,
      late_flag: req.body.late_flag,
      early_exit_flag: req.body.early_exit_flag,
      late_apr_flag: req.body.late_apr_flag,
      early_exit_apr_flag: req.body.early_exit_apr_flag,
      approval_emp_id: req.body.approval_emp_id,
      approval_date: req.body.approval_date,
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
    res.json({isExecuted:false, message: "Daily attendance is not updated for : "+ updatedId});
    res.end();
  });
});

router.put('/corattdailylog/lateapr/:appruser', async (req,res) => {
  try {
    console.log(req.body.obj);
    let object = req.body.obj;
  
    object.forEach( async (element,index) => {
      if (element.type == 'LATE') {
       console.log(element.id, element.flag);
      let approvalempid = req.params.appruser;
      let updatedId = element.id;
      let lateEarlyFlag;
      let setObj;
      let lateaprreqdata = 
      await dbConnect.query(`SELECT late_att_date, employee_code, approval_type 
                              FROM cor_att_lat_approval 
                              where IDNO=${updatedId}`
                , {type: QueryTypes.SELECT, plain: true});
        lateEarlyFlag = lateaprreqdata.approval_type;
        if (lateaprreqdata.approval_type =='L') {
            setObj = {
              approval_emp_id: approvalempid,
              late_apr_flag: element.flag,
              approver_comment: element.comment,
              approval_date: Date(),
              update_by: approvalempid,
              update_date: Date()
            }

            lateApprovalModel.update(
                  {
                    approval_emp_id: approvalempid,
                    approval_status: element.flag,
                    approver_comment: element.comment,
                    approval_date: Date(),
                    update_by: approvalempid,
                    update_date: Date()
                  },
                  {where: 
                    { IDNO: updatedId
                    }
                  }
            )
          } else {
            setObj = {
              approval_emp_id: approvalempid,
              early_exit_apr_flag: element.flag,
              approver_comment: element.comment,
              approval_date: Date(),
              update_by: approvalempid,
              update_date: Date()
            }

            lateApprovalModel.update(
              { approval_emp_id: approvalempid,
                approval_status: element.flag,
                approver_comment: element.comment,
                approval_date: Date(),
                update_by: approvalempid,
                update_date: Date()
              },
            {where:{ 
              IDNO: updatedId
             }
            })
          }
        dailyLogModel.update(
            setObj,
          {where: 
            { attendance_date: lateaprreqdata.late_att_date,
              employee_code: lateaprreqdata.employee_code
            }
          }
        )                                       
      } else if (element.type == 'DUTY') {
        let aprStatus;
        if (element.flag == 'Y') {
          aprStatus = 'APR';
        } else if (element.flag == 'N') {
          aprStatus = 'REJ';
        }
        await outstationDutyModel.update({
            apply_status: aprStatus,
            approver_comment: element.comment,
            approver_date: Date()
          },
          { where: {
              id: element.id
            }
          })
      }
    });
    return res.json({isExecuted: true, message: 'Updated successfully!'});
  } catch (err) {
    console.log(err);
    return res.json({isExecuted: false, message: 'Error to update data!'});
  }
  
  // try{
  //   const objKeys = Object.keys(req.body.obj);
  //   let approvalempid = req.params.appruser;
  //   console.log(objKeys);
  //   console.log("Before");
  //   console.log(objKeys.length);
  //   for (let i = 0; i < objKeys.length; i++) 
  //   {
  //     let updatedId = objKeys[i];
  //     let aprflag =req.body.obj[objKeys[i]];
  //     console.log("After " + i);
  //     console.log(approvalempid+' '+ aprflag);
  //     let lateEarlyFlag;
  //     let setObj;
  //     let lateaprreqdata = 
  //     await dbConnect.query(`SELECT late_att_date, employee_code, approval_type 
  //                             FROM cor_att_lat_approval 
  //                             where IDNO=${updatedId}`
  //               , {type: QueryTypes.SELECT, plain: true} );
  //     lateEarlyFlag=lateaprreqdata.approval_type;
  //     console.log("lateEarlyFlag "+lateEarlyFlag);
  //     if (lateaprreqdata.approval_type =='L')
  //       {
  //         setObj ={
  //           approval_emp_id: approvalempid,
  //           late_apr_flag: aprflag,
  //           approval_date: Date(),
  //           update_by: approvalempid,
  //           update_date: Date()
  //         };
  //         lateApprovalModel.update(
  //               {
  //                 approval_emp_id: approvalempid,
  //                 approval_status: aprflag,
  //                 approval_date: Date(),
  //                 update_by: approvalempid,
  //                 update_date: Date()
  //               },
  //               {where: 
  //                 { IDNO: updatedId
  //                 }
  //               }
  //         )
  //       }
  //     else
  //       {
  //         setObj ={
  //         approval_emp_id: approvalempid,
  //         early_exit_apr_flag: aprflag,
  //         approval_date: Date(),
  //         update_by: approvalempid,
  //         update_date: Date()
  //         };
  //         lateApprovalModel.update(
  //           {
  //           approval_emp_id: approvalempid,
  //           approval_status: aprflag,
  //           approval_date: Date(),
  //           update_by: approvalempid,
  //           update_date: Date()
  //           },
  //         {where: 
  //           { IDNO: updatedId
  //           }
  //         }
  //         );
  //       }
  //     cor_att_daily_log.update(
  //         setObj
  //       ,
  //       {where: 
  //         { attendance_date: lateaprreqdata.late_att_date,
  //           employee_code: lateaprreqdata.employee_code
  //         }
  //       }
  //     )
  //   }
  //   res.json({message : 'Successfully Updated.'});
  //   res.end();
  // }
  // catch(err){
  //   res.json({ isExecuted: false, message: "Unknown Error: " + err });
  //   res.end();
  // }
});


module.exports = router