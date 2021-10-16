const express = require('express');
const reportController = require('../controllers/reports-controller');
const router = express.Router();


router.get('/report/report-list/:id', reportController.getReportListByModule);
router.get('/report/param-list/:reportId', reportController.getParamListByReport);


module.exports = router;