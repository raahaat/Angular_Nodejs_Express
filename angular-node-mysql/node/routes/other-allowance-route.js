const express = require('express');
const otherAllowanceController = require('../controllers/other-allowance-controller');

const router = express.Router();

router.get('/other-allowance-entry/view', otherAllowanceController.getOtherAllowance);
router.get('/other-allowance-entry/single-entry/:id', otherAllowanceController.getSingleEntry);
router.post('/other-allowance-entry/duplicate-check', otherAllowanceController.checkDuplicate);
router.delete('/other-allowance-entry/delete/:id', otherAllowanceController.deleteOtherAllowance);
router.post('/other-allowance-entry/add', otherAllowanceController.addOtherAllowance);
router.put('/other-allowance-entry/update/:id', otherAllowanceController.updateOtherAllowance);

module.exports = router