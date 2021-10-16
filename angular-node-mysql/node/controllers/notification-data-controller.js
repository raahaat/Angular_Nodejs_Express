const voluntaryTransferModel = require('../models/cor-voluntary-transfer');
const earnDeductModel =  require('../models/Earn-deduct-code');
const empModel = require('../models/cor-employee-master');
const deptModel = require('../models/con-department');
const divModel = require('../models/emp-grade-setup-model');
const desigModel = require('../models/designation-setup-model');
const leaveModel = require('../models/cor-leave-detail');
const notificationModel = require("../models/notification");
const Sequelize = require ('sequelize');
const {Op} = require ('sequelize');


exports.getNotificationData = async (req, res) => {
    try {
    let currentUser = req.params.id;
    let companyCode = '200';
    
    let leaveApproverCount = 
    await notificationModel.findOne({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('applicant_id')) , 'empCount']],
        where: {
          company_code: companyCode,
          notification_type: 'LEVAPR',
          notified_to: currentUser
         }}).then((data)=> {
            if (data === [] || data === '') {
                return 0
            } else {
                return data['dataValues']['empCount']
            }                
         })

    let leaveReplacementCount = 
        await notificationModel.findOne({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('applicant_id')) , 'empCount']],
            where: {
                company_code: companyCode,
                notification_type: 'LEVREP',
                notified_to: currentUser
            }}).then((data)=> {
                if (data === [] || data === '') {
                    return 0
                } else {
                    return data['dataValues']['empCount']
                }
                
            })    

       let totalNotification = Number(leaveApproverCount)+Number(leaveReplacementCount) ;     
       return res.status(200).json({leaveApproverCount, leaveReplacementCount, totalNotification });
    } catch (err) {
        console.log(err);
    }
};


exports.getNotificationInfo = async (userId) => {
    try {
    let currentUser = userId;
    let companyCode = '200';
    
    let leaveApproverCount = 
    await notificationModel.findOne({
        attributes: [[Sequelize.fn('COUNT', Sequelize.col('applicant_id')) , 'empCount']],
        where: {
          company_code: companyCode,
          notification_type: 'LEVAPR',
          notified_to: currentUser
         }}).then((data)=> {
            if (data === [] || data === '') {
                return 0
            } else {
                return data['dataValues']['empCount']
            }                
         })

    let leaveReplacementCount = 
        await notificationModel.findOne({
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('applicant_id')) , 'empCount']],
            where: {
                company_code: companyCode,
                notification_type: 'LEVREP',
                notified_to: currentUser
            }}).then((data)=> {
                if (data === [] || data === '') {
                    return 0
                } else {
                    return data['dataValues']['empCount']
                }
                
            })    

       let totalNotification = Number(leaveApproverCount)+Number(leaveReplacementCount) ;     
       return [{leaveApproverCount, leaveReplacementCount, totalNotification }];
    } catch (err) {
        console.log(err);
    }
};
