const express = require('express');
const loanAdvanceController = require('../controllers/loan-advance-controller');
const salaryHoldController = require('../controllers/salary-hold-controller');

const router = express.Router();



router.get('/emplist', loanAdvanceController.getEmployeeList);
router.get('/branch-list', loanAdvanceController.getBranch);
router.post('/salary-hold/submit', salaryHoldController.addSalaryHold);
router.get('/salary-hold/list', salaryHoldController.getSalaryHoldList); 
router.get('/salary-hold/fetch/:id', salaryHoldController.getSalaryHoldById)

module.exports = router;