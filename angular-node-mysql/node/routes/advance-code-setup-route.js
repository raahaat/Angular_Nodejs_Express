const express = require('express');
const advanceCodeSetupController = require('../controllers/advance-code-setup-controller');
const router = express.Router();



router.get('/advance-code/list', advanceCodeSetupController.getAdvanceCodeList);
router.post('/advance-code/submit', advanceCodeSetupController.addAdvanceCode);
router.get('/advance-count/last', advanceCodeSetupController.countAdvanceCode);
router.delete('/advance-code/delete/:id', advanceCodeSetupController.deleteAdvanceCode);
router.get('/advance-code/find/:id', advanceCodeSetupController.getAdvanceCodeById);
router.put('/advance-code/update/:id', advanceCodeSetupController.updateAdvanceCode);
// router.get('/branch-list', loanAdvanceController.getBranch);
// router.get('/deduct/code', loanAdvanceController.getDeductionCode);



module.exports = router;