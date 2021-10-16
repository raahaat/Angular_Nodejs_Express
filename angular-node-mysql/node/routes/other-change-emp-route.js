const express = require('express');
const router = express.Router();
const otherChangeEmpController = require('../controllers/other-change-emp-controller');

router.get('/document_type/list', otherChangeEmpController.getDocumentList);
router.get('/emplist', otherChangeEmpController.getEmployeeList);
router.get('/department/:dept', otherChangeEmpController.getDepartment);
router.get('/division/:div', otherChangeEmpController.getDivision);
router.get('/designation/:desig', otherChangeEmpController.getDesignation);
router.get('/branch/:branch', otherChangeEmpController.getBranch);
router.post('/other-change-emp/add', otherChangeEmpController.addOtherChangeEmp);

module.exports = router;

