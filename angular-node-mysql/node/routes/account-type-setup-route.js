const express = require('express');
const accountTypeSetupController = require('../controllers/account-type-setup-controller');
const router = express.Router();



router.get('/account-type/list', accountTypeSetupController.getAccountTypeList);
router.post('/account-type/submit', accountTypeSetupController.addAccountType);
// router.get('/advance-count/last', accountTypeSetupController.countAdvanceCode);
router.delete('/account-type/delete/:id', accountTypeSetupController.deleteAccountType);
router.get('/account-type/find/:id', accountTypeSetupController.getAccountTypeById);
router.put('/account-type/update/:id', accountTypeSetupController.updateAccountType);




module.exports = router;