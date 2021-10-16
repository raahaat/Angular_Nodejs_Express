const express = require('express');
const contactInfo = require('../controllers/home-contact-info');
const router = express.Router();

router.get('/contact-info/:id', contactInfo.getContactList);

module.exports = router;