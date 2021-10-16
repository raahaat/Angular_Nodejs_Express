const express = require('express');
const router = express.Router();
const userTypeController = require('../controllers/user-type-controller');


router.get('/user-type/list', userTypeController.getUserType);
router.post('/user-type/add', userTypeController.addUserType);
router.get('/user-type/fetch/:id', userTypeController.getUserTypeById);
router.put('/user-type/update/:id', userTypeController.updateUserType);
router.delete('/user-type/delete/:id', userTypeController.deleteUserType);
router.get('/user-type/approval-type', userTypeController.getApprovalTypeCode);
router.get('/user-type/user-list', userTypeController.getUserList);
router.get('/user-type/duplicate-check/:id', userTypeController.getUserDuplicateCheck);

module.exports = router;
