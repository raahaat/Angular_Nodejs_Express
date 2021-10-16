const express = require('express');
const paycycle = require('../controllers/pay-cycle-controller');
const router = express.Router();


router.get('/paycycle', paycycle.getAllPaycycle);
router.get('/paycycle/:id', paycycle.getSinglePaycycle);
router.post('/add-paycycle', paycycle.addPaycycle);
router.delete('/delete-paycycle/:id', paycycle.deletePaycycleById);
router.put('/edit-paycycle/:id', paycycle.editPaycycleById);

router.get('/pay-cycle/list/latest', paycycle.getPayCycleLatest);
router.get('/pay-cycle/list/all', paycycle.getPayCycleAll);
router.get('/pay-cycle/fetch/:id', paycycle.getPayCycleById);
router.put('/pay-cycle/update/:id', paycycle.updatePayCycle);

module.exports = router;