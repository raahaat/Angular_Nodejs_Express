const express = require('express');
const notificationController = require('../controllers/notification-data-controller');

const router = express.Router();

router.get('/get-notification-data/:id', notificationController.getNotificationData);

module.exports = router;
