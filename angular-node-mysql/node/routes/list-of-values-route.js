const express = require('express');
const lovController = require('../controllers/list-of-values-controller');

const router = express.Router();


router.get('/lov-list/code-desc/:code', lovController.getCodeDescription);
router.get('/lov-list/document-type', lovController.getDocumentTypeList);
router.get('/lov-list/pay-cycle', lovController.getPayCycleList);
router.get('/lov-list/single-pay-cycle', lovController.getSinglePayCycle);
router.get('/lov-list/earn-deduct-code', lovController.getEarnDeductCodeList);
router.get('/lov-list/employee-list', lovController.getEmployeeLovList);
router.get('/lov-list/active-employee-list', lovController.getActiveEmployeeLovList);
router.get('/lov-list/branch', lovController.getBranchLovList);
router.get('/lov-list/grade', lovController.getGradeLovList);
router.get('/lov-list/department', lovController.getDepartmentLovList);
router.get('/lov-list/branch', lovController.getBranchLovList);
router.get('/lov-list/emp-type', lovController.getEmployeeTypeLovList);
router.get('/lov-list/country', lovController.getCountryLovList);
router.get('/lov-list/nationality', lovController.getNationalityLovList);
router.get('/lov-list/sex', lovController.getSexLovList);
router.get('/lov-list/religion', lovController.getReligionLovList);
router.get('/lov-list/marital-status', lovController.getMaritalStatusLovList);
router.get('/lov-list/blood-group', lovController.getBloodGroupLovList);
router.get('/lov-list/exam-name', lovController.getExamNameLovList);
router.get('/lov-list/designation', lovController.getDesignationList);
router.get('/lov-list/designation-desc', lovController.getDesignationDescList);
router.get('/lov-list/emp-category', lovController.getEmpCategoryLovList);
router.get('/lov-list/district', lovController.getDistrictLovList);
router.get('/lov-list/leave-code', lovController.getLeaveCodeLovList);
router.get('/lov-list/other-designation', lovController.getOtherDesignationLovList);
router.get('/lov-list/company', lovController.getCompanyLovList);
router.get('/lov-list/education-level', lovController.getEducationLeavel);
router.get('/lov-list/education-board', lovController.getEducationBoardLovList);
router.get('/lov-list/education-result', lovController.getEducationResultLovList);
router.get('/lov-list/education-subject', lovController.getSubjectLovList);
router.get('/lov-list/education-institute', lovController.getInstituteLovList);
router.get('/lov-list/leave-type', lovController.getLeaveTypeLovList);
router.get('/lov-list/emp-list/search/:data', lovController.getEmpListBySearch);
router.get('/lov-list/empinfo/:id', lovController.getEmployeeInfo);

module.exports = router;
