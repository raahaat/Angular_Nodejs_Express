const express = require('express');
const trainingController = require('../controllers/training-controller');

const router = express.Router();


router.get('/oracledata/training/:pyostamp', trainingController.getTrainingData);
router.get('/oracledata/trainingfor/:pyostamp', trainingController.getTrainingForeignData);


module.exports = router;