const express = require('express');
const router = express.Router();
const contractExtendController = require('../controllers/contract-extend-controller');

// Some route are used from "other-change-emp-route" for this controller
router.post('/contract-emp-extend/add', contractExtendController.addContractExtend);

module.exports = router;

