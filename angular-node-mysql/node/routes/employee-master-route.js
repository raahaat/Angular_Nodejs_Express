const express = require('express');
const empMasterController = require('../controllers/employee-master-controller');

const router = express.Router();



router.get('/employee-master/view', empMasterController.getEmployeeMaster);
router.post('/employee-master/add', empMasterController.addEmployeeMaster);
router.get('/employee-master/fetch/:id', empMasterController.getEmployeeMasterById);
router.put('/employee-master/update/:id', empMasterController.updateEmployeeMaster);
router.get('/employee-master/id-check/:id', empMasterController.getEmpIdDuplicateCheck);


router.get('/employee-master/list/pdf', empMasterController.getEmployeeListPdf);


// Employee Address Information
router.get('/emp-address/list/:id', empMasterController.getEmpAddressById);
router.post('/emp-address/add', empMasterController.updateEmpAddress);
// router.delete('/emp-address/delete/:id', empMasterController.deleteEmpSalary);
router.get('/emp-address/district-list', empMasterController.getDistrictList);
router.get('/emp-address/upazila-list/:id', empMasterController.getUpazilaListByDistrict);


// Employee Current Salary Information
router.get('/emp-salary/list/:id', empMasterController.getEmpSalaryById);
router.delete('/emp-salary/delete/:id', empMasterController.deleteEmpSalary);
router.get('/emp-salary/desig-wise-salary/:desCode', empMasterController.getDesigWiseSalary);


// Employee Leave Information
router.get('/emp-leave/list/:id', empMasterController.getEmpLeaveById);
router.put('/emp-leave/update/:id', empMasterController.updateEmpLeave);
router.delete('/emp-leave/delete/:id', empMasterController.deleteEmpLeave);


// Employee Education Information
router.get('/emp-education/list/:id', empMasterController.getEmpEducationById);
router.put('/emp-education/update/:id', empMasterController.updateEmpEducation);
router.delete('/emp-education/delete/:id', empMasterController.deleteEmpEducation);


//Employee Experience Information
router.get('/emp-experience/list/:id', empMasterController.getEmpExperienceById);
router.put('/emp-experience/update/:id', empMasterController.updateEmpExperience);
router.delete('/emp-experience/delete/:id', empMasterController.deleteEmpExperience);


// Employee Approval
router.get('/employee-approval/view', empMasterController.getEmployeeApproval);
router.put('/employee-approval/update/:id', empMasterController.updateEmployeeApproval);



module.exports = router;