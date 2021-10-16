const express = require('express');
const birthdayController = require('../controllers/birthday-controller');

const router = express.Router();


router.get('/birthdayMessage', birthdayController.getBirthdayMessage);
router.get('/birthdayList', birthdayController.getBirthdayList);


module.exports = router;