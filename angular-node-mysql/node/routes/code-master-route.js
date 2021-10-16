const express = require('express');
const codeMasterController = require('../controllers/code-master-controller');

const router = express.Router();

router.get('/code-master/code-header', codeMasterController.getCodeHeader);
router.get('/code-master/code-header-desc/:code', codeMasterController.getCodeHeaderDesc);
router.get('/code-master/list/:headCode', codeMasterController.getCodeMaster);
router.post('/code-master/add', codeMasterController.addCodeMaster);
router.get('/code-master/fetch/:id', codeMasterController.getCodeMasterById);
router.put('/code-master/update/:id', codeMasterController.updateCodeMaster);
router.delete('/code-master/delete/:id', codeMasterController.deleteCodeMaster);


module.exports = router;
