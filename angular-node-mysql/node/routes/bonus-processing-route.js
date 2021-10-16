const express = require('express');
const bonusProcessing = require('../controllers/bonus-processing-controller');
const router = express.Router();


router.get('/bonus-processing/:id', bonusProcessing.process);


module.exports = router;