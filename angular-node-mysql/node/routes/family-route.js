const express = require('express');
const familyController = require('../controllers/family-controller');

const router = express.Router();


router.get('/oracledata/family/:pyostamp', familyController.getFamilyInfo);


module.exports = router;