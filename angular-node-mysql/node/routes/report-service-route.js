const express = require('express');
const reportServiceController = require('../controllers/report-service');
const reportGroupController = require('../controllers/report-group-controller');
const router = express.Router();

router.post('/report-service/data', reportServiceController.getReportData);
router.get('/report-service/param/:id', reportServiceController.getReportDisplayField);
router.get('/report-service/header-percant/:id', reportServiceController.getReportHeaderParcent);
router.get('/report-service/field/:id', reportServiceController.getReportField);
router.get('/report-service/property/:id', reportServiceController.getReportProperty);


router.post('/report-group-service/data', reportGroupController.getReportGroupData);
router.get('/report-service-group/field/:id', reportServiceController.getGroupReportField);
router.get('/report-service-group/header-param/:id', reportServiceController.getSingleGroupHeader);
router.get('/report-service-group/header-parcentage/:id', reportServiceController.getSingleGroupHeaderPercent);
router.get('/report-service-group/multi-header-param/:id', reportServiceController.getMultiGroupHeader);
router.get('/report-service-group/multi-header-parcentage/:id', reportServiceController.getMultiGroupHeaderPercent);

module.exports = router;