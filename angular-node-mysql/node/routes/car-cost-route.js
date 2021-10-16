const express = require('express');
const carCostController = require('../controllers/car-cost-controller');

const router = express.Router();

router.get('/car-cost/view', carCostController.getCarCostData);
router.get('/car-cost/single-entry/:id', carCostController.getSingleCarData);
router.post('/car-cost/duplicate-check', carCostController.checkDuplicate);
router.delete('/car-cost/delete/:id', carCostController.deleteCarCost );
router.post('/car-cost/add', carCostController.addCarCost);
router.put('/car-cost/update/:id', carCostController.updateCarCost);

module.exports = router