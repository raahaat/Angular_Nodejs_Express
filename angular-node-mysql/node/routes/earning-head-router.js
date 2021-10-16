const express = require('express');
const earninghead = require('../controllers/earning-head-controller');
const router = express.Router();


router.get('/earninghead/view', earninghead.getEarningHeadAll);
router.get('/earninghead/duplicate/:id', earninghead.getDupicateById);
router.post('/earninghead/add', earninghead.addEarningType);
router.delete('/earninghead/delete/:id', earninghead.deleteEarningType);
router.put('/earninghead/update/:id', earninghead.updateEarningType);
router.get('/earninghead/fetch/:id', earninghead.getEarningTypeById);

module.exports = router;