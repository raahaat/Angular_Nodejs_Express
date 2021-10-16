const express = require('express');
const outstationDutyController = require('../controllers/outstation-duty-controller');

const router = express.Router();

router.get('/outstation-duty/view', outstationDutyController.getAll);
router.post('/outstation-duty/add', outstationDutyController.add);
router.get('/outstation-duty/edit/:id', outstationDutyController.edit);
router.put('/outstation-duty/update', outstationDutyController.update);
router.delete('/outstation-duty/delete/:id', outstationDutyController.delete);

// router.post('/department/add', divisionZoneController.addDivisionZone);
// router.delete('/department/delete/:id', divisionZoneController.deleteDivisionZone);
// router.get('/department/fetch/:id', divisionZoneController.getDivisionZoneById);
// router.put('/department/update/:id', divisionZoneController.updateDivisionZone);


module.exports = router;
