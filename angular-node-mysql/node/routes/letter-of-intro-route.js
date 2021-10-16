const express = require('express');
const letterIntroController = require('../controllers/letter-of-intro-controller');
const router = express.Router();

router.get('/letter-of-intro/get-sal-info/:empId', letterIntroController.getLetterIntroInfo);
router.post('/letter-of-intro/generate-report', letterIntroController.generateReport);

module.exports = router;
