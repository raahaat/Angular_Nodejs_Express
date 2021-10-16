const express = require('express');
const router = express.Router();

const empGroupController = require('../controllers/emp-group-define-controller');

router.get('/department/list', empGroupController.getDepartmentList);
router.post('/emp-group-define/add', empGroupController.addEmpGroup);

module.exports = router;
