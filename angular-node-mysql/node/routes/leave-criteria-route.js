const express = require('express');
const leaveCriteriaController = require('../controllers/leave-criteria-controller');

const router = express.Router();



router.get('/leave-criteria/list', leaveCriteriaController.getLeaveCriteriaList);
router.post('/leave-criteria/add', leaveCriteriaController.addLeaveCriteria);
router.get('/leave-criteria/fetch/:id', leaveCriteriaController.getLeaveCriteriaById);
router.put('/leave-criteria/update/:id', leaveCriteriaController.updateLeaveCriteria);
router.delete('/leave-criteria/delete/:id', leaveCriteriaController.deleteLeaveCriteria);


module.exports = router;
