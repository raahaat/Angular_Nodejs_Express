const express = require('express');
const attendanceController = require('../controllers/attendance-process-controller');

const router = express.Router();

router.post('/attendance-process/submit', attendanceController.attendanceProcess);

module.exports = router;
