const express = require('express');
const accountTypeSetupController = require('../controllers/account-type-setup-controller');
const systemAccessController = require('../controllers/system-access-controller');
const router = express.Router();

router.get('/system-access/list', systemAccessController.getSystemAccessList);
router.get('/user-type-access/list', systemAccessController.getUserTypeList);
router.post('/system_access/submit', systemAccessController.addSystemAccess);
router.delete('/system-access/delete/:id', systemAccessController.deleteSysAccess);
router.get('/account-type/find/:id', accountTypeSetupController.getAccountTypeById);

router.get('/system-access/single-list/:id', systemAccessController.getSingleUserType);
router.get('/system-acc-edit/list/:id', systemAccessController.getSysAccSingleEdit);
router.get('/system-acc-single/list/:id', systemAccessController.getSysAccSingleList);

router.put('/system-access/update/:id', systemAccessController.updateSystemAccess);
router.get('/system-access/duplicate-check', systemAccessController.checkDuplicate);
router.get('/system-access/duplicate-check/edit', systemAccessController.checkDuplicateEdit);

module.exports = router;