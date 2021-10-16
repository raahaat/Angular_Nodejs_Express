const express = require('express');
const eventInfo = require('../controllers/home-event-info');
const router = express.Router();

router.get('/event-info/', eventInfo.getEventList);

module.exports = router;