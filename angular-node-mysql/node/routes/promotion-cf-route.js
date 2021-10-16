const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotion-cf-controller');

router.get('/promotion/document_type/list', promotionController.getDocumentList);
router.get('/designation-list', promotionController.getDesignationList);
router.get('/contractual/empinfo/:id', promotionController.getEmployeeInfo);
router.get('/emplist', promotionController.getEmployeeList);
router.get('/contractual/emplist/:data', promotionController.getContractualEmpList);
router.get('/department/:dept', promotionController.getDepartment);
router.get('/division/:div', promotionController.getDivision);
router.get('/designation/:desig', promotionController.getDesignation);
router.get('/branch/:branch', promotionController.getBranch);
router.get('/salary-info/:designation', promotionController.getSalaryByDesignation);
router.post('/promotion-cf/add', promotionController.addPromotionCf);
// router.post('/other-change-emp/add', promotionController.addOtherChangeEmp);


module.exports = router;

