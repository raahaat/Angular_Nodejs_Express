const express = require('express');
const leaveApplyController = require('../controllers/leave-detail-controller');

const router = express.Router();



router.post('/leave-application/apply', leaveApplyController.addLeaveApplication);
router.get('/leave-application/get-leave-code', leaveApplyController.getLeaveCodeList);
router.get('/leave-application/leave-data/:id', leaveApplyController.getLeaveData);
router.get('/leave-application/get-leave-balance/:id', leaveApplyController.getLeaveBalance);
router.get('/leave-application/single-leave-info/:id', leaveApplyController.getSingleLeaveById);
router.get('/leave-application/get-approval-person', leaveApplyController.getApprovalPerson);
router.get('/leave-application/duplicate-leave-data', leaveApplyController.getDuplicateLeaveApply);
router.put('/leave-application/update/:id', leaveApplyController.updateSingleLeave);
// router.delete('/leave-criteria/delete/:id', leaveCriteriaController.deleteLeaveCriteria);


module.exports = router;
