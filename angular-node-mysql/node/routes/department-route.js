const express = require('express');
const divisionZoneController = require('../controllers/department-controller');

const router = express.Router();

router.get('/department/view', divisionZoneController.getDivisionZoneList);
router.post('/department/add', divisionZoneController.addDivisionZone);
router.delete('/department/delete/:id', divisionZoneController.deleteDivisionZone);
router.get('/department/fetch/:id', divisionZoneController.getDivisionZoneById);
router.put('/department/update/:id', divisionZoneController.updateDivisionZone);
router.get('/department/count', divisionZoneController.countDepartment);


module.exports = router;
