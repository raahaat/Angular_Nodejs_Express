const express = require('express');
const leaveReplaceController = require('../controllers/leave-replace-controller');

const router = express.Router();

router.get('/leave-replace/list/:id', leaveReplaceController.getLeaveDetails);
router.get('/leave-approval/list/:id', leaveReplaceController.getLeaveApprovalPendingList);
router.put('/leave-replace/update/:id', leaveReplaceController.updateLeaveDetails);
// router.post('/leave-replace/after-update/:id', leaveReplaceController.afterUpdate);
router.put('/leave-approval/update/:id', leaveReplaceController.updateLeaveApproval);
router.get('/leave-replace/fetch/:id', leaveReplaceController.getLeaveDetailsById);

module.exports = router;
