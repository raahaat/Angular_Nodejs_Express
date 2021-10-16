const express = require('express');
const daction = require('../controllers/disciplinary-action-controller');
const router = express.Router();


router.get('/daction/view', daction.getAllDaction);
router.get('/daction/getAllEmp', daction.getAllEmp);
router.get('/daction/getEmpById/:id', daction.getEmpById);
router.get('/daction/getEarnHead', daction.getEarnHead);
router.post('/daction/add', daction.add);
router.delete('/daction/delete/:id', daction.delete);
router.get('/daction/edit/:id', daction.edit);
router.put('/daction/update', daction.update);
// router.delete('/delete-bheldup/:id', bheldup.deleteBheldupById);
// router.put('/edit-bheldup/:id', bheldup.editBheldupById);

module.exports = router;