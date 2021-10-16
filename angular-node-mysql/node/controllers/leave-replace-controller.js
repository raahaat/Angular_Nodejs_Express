const leaveDetailModel = require("../models/cor-leave-detail");
const leaveMasterModel = require("../models/cor-leave-master");
const leaveFinalModel = require("../models/cor-emp-leave-final");
const leaveInfoModel = require("../models/con-cor-leave-master");
const leaveRepModel = require("../models/leave-replacement");
const leaveAprModel = require("../models/leave-approval");
const leaveCriteriaModel = require("../models/con-leave-criteria");
const leaveTypeModel = require('../models/con-leave-type');
const employeeModel = require("../models/cor-employee-master");
const notificationModel = require("../models/notification");
const { Op } = require("sequelize");
const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');


exports.getLeaveDetails = async (req, res) => {
  let companyCode = '200';
  let userId = req.params.id;

  let repPendingList = 
  await dbConnect.query (
    `Select a.id, a.company_code, a.serial, a.replacement_id, b.employee_name,
            a.apply_date, a.from_date, a.end_date, a.leave_type, a.leave_code,
            e.description leave_name,
            a.leave_purpose, a.replacement_id, a.replacement_flag, a.replacement_date
       From leave_replacement a, cor_employee_master b, cor_leave_detail d, con_leave_type e
      Where a.company_code = '${companyCode}'
        And a.company_code = b.company_code
        And a.company_code = e.company_code
        And a.leave_type = e.head_code
        And a.applicant_id = b.employee_code
        And a.company_code = d.company_code
        And a.applicant_id = d.employee_code
        And a.apply_date = d.apply_date
        And a.from_date = d.from_date
        And a.end_date = d.end_date
        And a.leave_type = d.leave_type_code
        And d.leave_status <> 'CLO'
        And (a.replacement_flag is null or a.replacement_flag = '')
        And a.replacement_id = '${userId}'                   
        order by a.apply_date desc, a.from_date desc, a.end_date`
      , {type: QueryTypes.SELECT}
  )

  return res.json({isExecuted: true, data: repPendingList});

  // leaveRepModel.belongsTo(leaveTypeModel,
  //       { foreignKey:'leave_type',targetKey:'head_code'});
  // leaveRepModel.belongsTo(employeeModel,
  //      { foreignKey:'applicant_id',targetKey:'employee_code'});

  // leaveRepModel.findAll({ 
  //   where: { 
  //     company_code: companyCode,
  //     replacement_id: userId,
  //     replacement_flag: {[Op.or]: ['', null]
  //   } 
  //   },
  //   order: [
  //   ['apply_date', 'DESC'],
  //   ['from_date', 'DESC']
  //   ],
  //   include:[
  //     {model: leaveTypeModel, attributes:['description']},
  //     {model: employeeModel, attributes:['employee_name']}]
  // })
  // .then((getData) => {
  //   res.json({ isExecuted: true, data: getData });
  //   res.end();
  // });
};


exports.getLeaveApprovalPendingList = async (req, res) => {
  try {
    let companyCode = '200';
    let userId = req.params.id;
  
    let aprPendingList =
     await dbConnect.query (
      `Select a.id, a.company_code, a.serial, a.applicant_id, b.employee_name,
              a.apply_date, a.from_date, a.end_date, a.leave_type, a.leave_code,
              e.description leave_name,
              a.leave_purpose, a.approval_id, a.approval_flag, a.approval_date
         From leave_approval a, cor_employee_master b, cor_leave_detail d, con_leave_type e
        Where a.company_code = '${companyCode}'
          And a.company_code = b.company_code
          And a.company_code = e.company_code
          And a.leave_type = e.head_code
          And a.applicant_id = b.employee_code
          And a.company_code = d.company_code
          And a.applicant_id = d.employee_code
          And a.apply_date = d.apply_date
          And a.from_date = d.from_date
          And a.end_date = d.end_date
          And a.leave_type = d.leave_type_code
          And d.leave_status <> 'CLO'
          And (a.approval_flag is null or a.approval_flag = '')
          And a.approval_id = '${userId}'
          And exists (Select applicant_id
                        From leave_replacement x
                       Where company_code = a.company_code
                         And applicant_id = a.applicant_id
                         And apply_date = a.apply_date
                         And from_date = a.from_date
                         And end_date = a.end_date
                         And leave_type = a.leave_type
                         And IFNULL(replacement_flag,'N') = 'Y'
                      Having count(applicant_id) = IFNULL((Select count(applicant_id)
                                                             From leave_replacement
                                                            Where company_code = a.company_code
                                                              And applicant_id = a.applicant_id
                                                              And leave_type = a.leave_type
                                                              And apply_date = a.apply_date
                                                              And from_date = a.from_date
                                                              And end_date = a.end_date),0)) 
          Having a.serial IN (Select min(serial)
                                From leave_approval
                               Where company_code = a.company_code
                                 And applicant_id = a.applicant_id
                                 And apply_date = a.apply_date
                                 And from_date = a.from_date
                                 And end_date = a.end_date
                                 And leave_type = a.leave_type
                                 And (approval_flag is null or approval_flag = ''))                   
          order by a.apply_date desc, a.from_date desc, a.end_date`
          ,{type: QueryTypes.SELECT})

    // let aprPendingList =
    //  await dbConnect.query (
    //    `Select a.id, a.company_code, a.serial, a.applicant_id, b.employee_name, 
    //            a.apply_date, a.from_date, a.end_date, a.leave_type, a.leave_code,
    //           (Select description From con_leave_type where company_code = a.company_code
    //               And head_code = a.leave_type) leave_name,
    //            a.leave_purpose, a.approval_id, a.approval_flag, a.approval_date
    //       From leave_approval a, cor_employee_master b
    //      Where a.company_code = '${companyCode}'
    //        And a.company_code = b.company_code
    //        And a.applicant_id = b.employee_code
    //        And (a.approval_flag is null or a.approval_flag = '')
    //        And a.approval_id = '${userId}'
    //        And a.applicant_id IN (Select employee_code
    //                                 From cor_leave_detail
    //                                Where company_code = a.company_code
    //                                  And employee_code = a.applicant_id
    //                                  And apply_date = a.apply_date
    //                                  And from_date = a.from_date
    //                                  And end_date = a.end_date
    //                                  And leave_type = a.leave_type
    //                                  And leave_status <> 'CLO')
    //       And a.serial in (Select min(serial)
    //                           From leave_approval
    //                          Where company_code = a.company_code
    //                            And applicant_id = a.applicant_id
    //                            And apply_date = a.apply_date
    //                            And from_date = a.from_date
    //                            And end_date = a.end_date
    //                            And leave_type = a.leave_type
    //                            And (approval_flag is null or approval_flag = ''))
          //  And exists (Select applicant_id
          //                From leave_replacement x
          //               Where company_code = a.company_code
          //                 And applicant_id = a.applicant_id
          //                 And apply_date = a.apply_date
          //                 And from_date = a.from_date
          //                 And end_date = a.end_date
          //                 And leave_type = a.leave_type
          //                 And replacement_flag = 'Y'
          //              Having count(applicant_id) = IFNULL((Select count(applicant_id)
          //                                                     From leave_replacement
          //                                                    Where company_code = a.company_code
          //                                                      And applicant_id = a.applicant_id
          //                                                      And leave_type = a.leave_type
          //                                                      And apply_date = a.apply_date
          //                                                       And from_date = a.from_date
          //                                                      And end_date = a.end_date),0))                    
    //       order by a.apply_date desc, a.from_date desc, a.end_date `, {type: QueryTypes.SELECT})
    
     return res.status(200).json(aprPendingList);

  } catch (err) {
    console.log('Leave approval pending list error: ' + err);
  }
  
};


exports.getLeaveDetailsById = async (req, res) => {
  let editId = req.params.id;

  leaveDetailModel
    .findOne({ where: { id: editId } })
    .then((editData) => {
      res.json({
        isExecuted: true,
        data: editData,
        message: "Data fetched successfully.",
      });
      res.end();
    })
    .catch((err) => {
      res.json({ isExecuted: false, message: "Error to get data." });
      res.end();
    });
};

exports.updateLeaveDetails = async (req, res) => {
  let companyCode = '200';
  try {
    const objKeys = Object.keys(req.body.obj);
    console.log(objKeys);
    for (let i = 0; i < objKeys.length; i++) {
      console.log(objKeys[i]);
      let idData =
        await leaveRepModel.findOne({ 
            where: { 
              company_code: companyCode,
              id: objKeys[i]
            }
        }).then(data=> {
          return data.dataValues;
        })

        if (idData.id) {
          await leaveRepModel.update(
            {
              replacement_flag: req.body.obj[objKeys[i]],
              replacement_date: new Date()
            },
            { where: { 
                company_code : companyCode, 
                id: objKeys[i] } 
            })

          await notificationModel.destroy({
            where: {
              company_code: companyCode,
              applicant_id: idData.applicant_id,
              apply_date: idData.apply_date,
              from_date: idData.from_date,
              end_date: idData.end_date,
              notification_type: 'LEVREP',
              notified_to: idData.replacement_id
            }
          })  

           if (req.body.obj[objKeys[i]] === 'N') {
            await leaveDetailModel.update(
              {
                leave_status: 'CAN'
              },
              {where: {
                company_code: companyCode,
                employee_code: idData.applicant_id,
                leave_code: idData.leave_code,
                apply_date: idData.apply_date,
                from_date: idData.from_date,
                end_date: idData.end_date,
              }
            })            
          } else {
            let remainData = 
              await leaveRepModel.findAll(
                { where: {
                     company_code: companyCode,
                     applicant_id: idData.applicant_id,
                     apply_date: idData.apply_date,
                     from_date: idData.from_date,
                     end_date: idData.end_date,
                     replacement_flag: {[Op.or]: ['', null]} 
                   }
                })

              if (remainData.length === 0) {
                let aprData = 
                  await leaveAprModel.findOne({
                    where: {
                      company_code: companyCode,
                      applicant_id: idData.applicant_id,
                      apply_date: idData.apply_date,
                      from_date: idData.from_date,
                      end_date: idData.end_date,
                      approval_flag: {[Op.or]: ['', null]}
                    },
                    order: [
                      ['serial', 'ASC']
                    ]    
                  }).then(data=> {
                    return data.dataValues;
                  })

                  let notifyData = {
                    company_code: companyCode,
                    applicant_id: idData.applicant_id,
                    document_date: idData.apply_date,
                    apply_date: idData.apply_date,
                    from_date: idData.from_date,
                    end_date: idData.end_date,
                    notification_type: 'LEVAPR',
                    notified_to: aprData.approval_id,
                    status: 'Y',
                    created_time: new Date()
                  };
      
                notificationModel.create(notifyData)
                .catch((err)=> {
                  console.log('Notify error ', err);
                  return res.json({isExecuted: false, message : 'Error to insert in Notification table.'});        
                });
              }     
          }         
        }  
    }
   return res.json({isExecuted:true, message:"Replacement updated successfully"});
  } catch (err) {
   return  res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};


exports.updateLeaveApproval = async (req, res) => {
  let companyCode = '200';
  try {    
    async function updateLeaveBalance(updateEmpCode, updateLeaveCode, upLeaveDuration) {
      let leaveCount = 
        await leaveMasterModel.findAll({
          where: {
            company_code: companyCode,
            employee_code: updateEmpCode,
            leave_code: updateLeaveCode
          }
        });

    if (leaveCount.length === 0) {
      let maxLeave = 
        await leaveInfoModel.findAll({
          attributes: ['eligible_day'],
          where: {
            company_code: companyCode,
            leave_code: updateLeaveCode
          }
        }).then((maxdays)=> {
          if (maxdays.length > 0) {
            return maxdays[0]['dataValues'].eligible_day
          } else {
            return 0
          }
        }).catch((err)=> {
          res.json({ isExecuted: false, message: `Error occured to get max days of ${updateLeaveCode}`});
          throw new Error (`Error occured to get max days of ${updateLeaveCode}`);
        })
      
      let leaveMasterData = {
        company_code: companyCode,
        employee_code: updateEmpCode,
        leave_code:  updateLeaveCode,
        yearly_balance: maxLeave - upLeaveDuration,
        leave_avail: upLeaveDuration,
        leave_encash: 0,
        insert_by: 'AUTO',
        insert_date: new Date()
      }
      await leaveMasterModel.create(leaveMasterData)
          .catch((err)=> {
            res.json({ isExecuted: false, message: `Error to insert leave master data for ${updateEmpCode}`});
            throw new Error (`Error to insert leave master data for ${updateEmpCode}`);
          })
    } else if (leaveCount.length === 1) {
      await leaveMasterModel.update({
        yearly_balance : Sequelize.literal(`yearly_balance - ${upLeaveDuration}`),
        leave_avail: Sequelize.literal(`leave_avail + ${upLeaveDuration}`)
      }, {where: {
            company_code: companyCode,
            employee_code: updateEmpCode,
            leave_code: updateLeaveCode
         }
      })
    } else if (leaveCount.length > 1) {
      res.json({ isExecuted: false, message: `Too many leave code found of ${updateLeaveCode}`});
      throw new Error (`Too many leave code found of ${updateLeaveCode}`);
    }
    }; //Function end

    const objKeys = Object.keys(req.body.obj);
    for (let i = 0; i < objKeys.length; i++) {
      let approvalFlag = req.body.obj[objKeys[i]];
      let idData =
        await leaveAprModel.findOne({ 
            where: { 
              company_code: companyCode,
              id: objKeys[i]
            }
        }).then(data=> {
          return data.dataValues;
        })

      if (idData.id) {  
        await leaveAprModel.update(
          {
            approval_flag: req.body.obj[objKeys[i]],
            approval_date: new Date()
          },
          { where: { 
              company_code : companyCode, 
              id: objKeys[i] } 
          })

        await notificationModel.destroy({
          where: {
            company_code: companyCode,
            applicant_id: idData.applicant_id,
            apply_date: idData.apply_date,
            from_date: idData.from_date,
            end_date: idData.end_date,
            notification_type: 'LEVAPR',
            notified_to: idData.approval_id
          }
        })

      if (approvalFlag === 'Y') {
        let remainData = 
        await leaveAprModel.findAll(
          { where: {
               company_code: companyCode,
               applicant_id: idData.applicant_id,
               apply_date: idData.apply_date,
               from_date: idData.from_date,
               end_date: idData.end_date,
               approval_flag: {[Op.or]: ['', null]} 
             }
          })

        if (remainData.length === 0) {
          await leaveDetailModel.update(
            {
              leave_status: 'CLO'
            },
            { where: { 
              company_code: companyCode,
              employee_code: idData.applicant_id,
              leave_type_code: idData.leave_type,
              apply_date: idData.apply_date,
              from_date: idData.from_date,
              end_date: idData.end_date
             } 
            })

          let getLeaveCode = 
            await leaveCriteriaModel.findOne({
              attributes: ['leave_deduct_from'],
              where: {
                company_code: companyCode,
                leave_type_code: idData.leave_type 
              }
          })
          
          let leaveFinalData = {
            company_code: companyCode,
            employee_code: idData.applicant_id,
            leaveCode: getLeaveCode.leave_deduct_from,
            leaveType: idData.leave_type,
            applyDate: idData.apply_date,
            fromDate: idData.from_date,
            endDate: idData.end_date,
            startDate: idData.from_date,
            closeDate: idData.end_date,
            insert_by: 'AUTO',
            insert_date: new Date()
          } 

          let dateDifference = Math.abs(new Date(idData.end_date) - new Date(idData.from_date));
          let leaveDuration = Math.ceil(dateDifference / (1000 * 60 * 60 * 24))+1;

          await leaveFinalModel.create(leaveFinalData);
          await updateLeaveBalance(idData.applicant_id, getLeaveCode.leave_deduct_from, leaveDuration);          
        }  else {
          let aprData = 
            await leaveAprModel.findOne({
              where: {
                company_code: companyCode,
                applicant_id: idData.applicant_id,
                apply_date: idData.apply_date,
                from_date: idData.from_date,
                end_date: idData.end_date,
                approval_flag: {[Op.or]: ['', null]}
              },
              order: [
                ['serial', 'ASC']
              ]    
            }).then(data=> {
              return data.dataValues;
            })

          let notifyData = {
            company_code: companyCode,
            applicant_id: idData.applicant_id,
            document_date: idData.apply_date,
            apply_date: idData.apply_date,
            from_date: idData.from_date,
            end_date: idData.end_date,
            notification_type: 'LEVAPR',
            notified_to: aprData.approval_id,
            status: 'Y',
            created_time: new Date()
          };  

          await notificationModel.create(notifyData);
        }
       } else if (approvalFlag === 'N') {
          await leaveDetailModel.update(
            {
              leave_status: 'CAN'
            },
            { where: { 
              company_code: companyCode,
              employee_code: idData.applicant_id,
              leave_type: idData.leave_type,
              apply_date: idData.apply_date,
              from_date: idData.from_date,
              end_date: idData.end_date
             } 
            })
       }
      } 
    }
    return res.json({isExecuted:true,  message:"Leave Successfully Updated!"});
  } catch (err) {
    console.log(err);
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};
