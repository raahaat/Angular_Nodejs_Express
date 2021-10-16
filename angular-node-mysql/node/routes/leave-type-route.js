const express = require('express');
const leaveTypeController = require('../controllers/leave-type-controller');

const router = express.Router();

router.get('/leave-type/view', leaveTypeController.getLeaveTypeList);
router.post('/leave-type/add', leaveTypeController.addLeaveType);
router.delete('/leave-type/delete/:id', leaveTypeController.deleteLeaveType);
router.get('/leave-type/fetch/:id', leaveTypeController.getLeaveTypeById);
router.put('/leave-type/update/:id', leaveTypeController.updateLeaveType);
router.get('/leave-type/count', leaveTypeController.countLeaveType);



module.exports = router;
