const express = require('express');
const promotionController = require('../controllers/promotion-controller');

const router = express.Router();


router.get('/oracledata/promotions/:employeeId', promotionController.getPromotionHistory);
router.get('/oracledata/promotion/:pyostamp', promotionController.getPromotionInfo);


module.exports = router;