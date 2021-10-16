const express = require('express');
const riskAllowance = require('../controllers/risk-allowance-controller');
const router = express.Router();


router.get('/risk-allowance/view', riskAllowance.getAll);
router.post('/risk-allowance/add', riskAllowance.add);
router.get('/risk-allowance/edit/:id', riskAllowance.edit);
router.put('/risk-allowance/update', riskAllowance.update);
router.delete('/risk-allowance/delete/:id', riskAllowance.delete);


module.exports = router;