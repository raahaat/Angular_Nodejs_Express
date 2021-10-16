const express = require('express');
const variableController = require('../controllers/variable-transaction-controller');

const router = express.Router();

router.get('/variable-transacton/view', variableController.getVariableData);
router.get('/variable-transacton/single-transaction/:id', variableController.getSingleTransaction);
router.delete('/variable-transacton/delete/:id', variableController.deleteVariable );
router.post('/variable-transaction/add', variableController.addVariableTransaction);
router.put('/variable-transaction/update/:id', variableController.updateVariable);

module.exports = router