const express = require('express');
const medicalController = require('../controllers/medical-controller');

const router = express.Router();


router.get('/oracledata/medical/:pyempcde', medicalController.getMedicalData);


module.exports = router;