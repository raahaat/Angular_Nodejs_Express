const express = require('express');
const desigSalarySetupController = require('../controllers/desig-salary-setup-controller');

const router = express.Router();

router.post('/desig-salary-setup/add', desigSalarySetupController.addDesigSalarySetup);
router.get('/desig-salary-setup/list', desigSalarySetupController.getDesigWiseSalary);

module.exports = router;
