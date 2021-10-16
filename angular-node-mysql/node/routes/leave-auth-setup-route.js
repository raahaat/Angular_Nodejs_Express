const express = require('express');
const router = express.Router();
const leaveAuthController = require('../controllers/leave-authorize-controller');

router.get('/leave-auth-setup/view', leaveAuthController.getLeaveAuthorizedList);
router.delete('/leave-auth-setup/delete/:id', leaveAuthController.deleteLeaveAuth);
router.post('/leave-auth-setup/add', leaveAuthController.addLeaveAuth);
router.get('/leave-auth-setup/edit/:id', leaveAuthController.editLeaveAuth);
router.put('/leave-auth-setup/update/:id', leaveAuthController.updateLeaveAuth);

module.exports = router;

