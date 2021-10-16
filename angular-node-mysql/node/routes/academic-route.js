const express = require('express');
const academicController = require('../controllers/academic-controller');

const router = express.Router();


router.get('/oracledata/academic/:pyostamp', academicController.getAcademicData);
router.get('/oracledata/academic2/:pyostamp', academicController.getAcademicForeignData);


module.exports = router;