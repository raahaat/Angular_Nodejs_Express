const express = require('express');
const payrollController = require('../controllers/payroll-process-controller');

const router = express.Router();

router.get('/payroll/emplist', payrollController.getEmpListByParams);
router.post('/payroll-process/submit', payrollController.salaryProcess);
router.get('/process-salary-details/view', payrollController.getProcessSalByEmp);

module.exports = router;
