const express = require('express');
const selfMenuInfo = require('../controllers/self-service-menu');
const router = express.Router();

router.get('/selfMenuTree', selfMenuInfo.getSelfMenuList);

module.exports = router;