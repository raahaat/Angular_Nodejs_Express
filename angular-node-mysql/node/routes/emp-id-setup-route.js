const express = require('express');
const empIdSetupController = require('../controllers/emp-id-setup-controller');

const router = express.Router();



router.get('/id-setup/view', empIdSetupController.getEmpIdSetupList);
router.post('/id-setup/add', empIdSetupController.addEmpIdSetup);
router.get('/id-setup/fetch/:id', empIdSetupController.getEmpIdSetupById);
router.put('/id-setup/update/:id', empIdSetupController.updateEmpIdSetup);
router.delete('/id-setup/delete/:id', empIdSetupController.deleteEmpIdSetup);


module.exports = router;