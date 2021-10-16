const express = require('express');
const router = express.Router();
const transferReportingController = require('../controllers/transfer-reporting-controller');

router.get('/transfer/document_type/list', transferReportingController.getDocumentList);
router.get('/designation-list', transferReportingController.getDesignationList);
router.get('/empinfo/transfer/:id', transferReportingController.getEmployeeInfo);
router.get('/emplist/transfer', transferReportingController.getEmployeeList);
router.get('/department/:dept', transferReportingController.getDepartment);
router.get('/division/:div', transferReportingController.getDivision);
router.get('/designation/:desig', transferReportingController.getDesignation);
router.get('/branch/:branch', transferReportingController.getBranch);
router.get('/salary-info/:designation', transferReportingController.getSalaryByDesignation);
// router.post('/promotion-cf/add', transferReportingController.addPromotionCf);
router.post('/transfer-reporting/add', transferReportingController.addPromotionCf);
router.post('/transfer-reporting/grw', transferReportingController.addGrowthNdtl);

// router.post('/other-change-emp/add', transferReportingController.addOtherChangeEmp);


module.exports = router;

