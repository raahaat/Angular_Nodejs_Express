const express = require('express');
const loanAdvanceController = require('../controllers/loan-advance-controller');
const proposeTransferController = require('../controllers/propose-transfer-controller');

const router = express.Router();



router.get('/emplist', loanAdvanceController.getEmployeeList);
router.get('/department-list', proposeTransferController.getDepartment);
router.get('/division-list', loanAdvanceController.getDivision);
router.get('/branch-list', loanAdvanceController.getBranch);
router.get('/empinfo/loan/:id', loanAdvanceController.getEmpInforLoan);
router.get('/deduct/code', loanAdvanceController.getDeductionCode);

router.post('/loan-advance/submit', loanAdvanceController.addLoanAdvances);


module.exports = router;