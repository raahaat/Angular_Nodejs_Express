const express = require('express');
const leaveController = require('../controllers/leave-controller');

const router = express.Router();


router.get('/oracledata/leave/:employeeId', leaveController.getLeave);
router.get('/oracledata/leave-details/:employeeId', leaveController.getLeaveDetails);


module.exports = router;