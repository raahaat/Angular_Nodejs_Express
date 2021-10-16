const express = require('express');
const headReportingController = require('../controllers/head-reporting-controller');

const router = express.Router();



router.get('/head-reporting/view', headReportingController.getHeadReportingList);
router.post('/head-reporting/add', headReportingController.addHeadReporting);
router.get('/head-reporting/fetch/:id', headReportingController.getHeadReportingById);
router.put('/head-reporting/update/:id', headReportingController.updateHeadReporting);
router.delete('/head-reporting/delete/:id', headReportingController.deleteHeadReporting);


module.exports = router;