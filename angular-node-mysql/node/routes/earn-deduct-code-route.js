const express = require('express');
const router = express.Router();
const earnDeductController = require('../controllers/earn-deduct-code-controller');
const prCriteriaController = require('../controllers/pr-criteria-controller');

router.get('/earn_deduct_code_list', earnDeductController.getEarnDeductCodeList);
router.get('/earn_deduct_adj', earnDeductController.getEarnDeductAdjList);
router.delete('/earn_deduct_adj/delete/:id', earnDeductController.deleteEarnDeductAdj);
router.post('/earn_deduct_adj/add', earnDeductController.addEarnDeductAdj);
router.get('/earn_deduct_adj/edit/:id', earnDeductController.editEarnDeductAdj);
router.put('/earn_deduct_adj/update/:id', earnDeductController.updateEarnDeductAdj);

router.get('/pr-criteria', prCriteriaController.prCriteriaList);
router.post('/pr-criteria/add', prCriteriaController.addPrCriteria);
router.get('/pr-criteria/edit/:id', prCriteriaController.editCriteria);
router.put('/pr-criteria/update/:id', prCriteriaController.updateCriteria);
router.delete('/pr-criteria/delete/:id', prCriteriaController.deleteCriteria);

module.exports = router;

