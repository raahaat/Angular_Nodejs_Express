const express = require('express');
const dutyDeskController = require('../controllers/duty-desk-controller');

const router = express.Router();



router.get('/duty-desk/view', dutyDeskController.getDutyDeskList);
router.post('/duty-desk/add', dutyDeskController.addDutyDesk);
router.get('/duty-desk/fetch/:id', dutyDeskController.getDutyDeskById);
router.put('/duty-desk/update/:id', dutyDeskController.updateDutyDesk);
router.delete('/duty-desk/delete/:id', dutyDeskController.deleteDutyDesk);


module.exports = router;
