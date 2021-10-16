const express = require('express');
const headDefineController = require('../controllers/head-define-controller');

const router = express.Router();



router.get('/head-define/view', headDefineController.getHeadDefineList);
router.post('/head-define/add', headDefineController.addHeadDefine);
router.get('/head-define/fetch/:id', headDefineController.getHeadDefineById);
router.put('/head-define/update/:id', headDefineController.updateHeadDefine);
router.delete('/head-define/delete/:id', headDefineController.deleteHeadDefine);


module.exports = router;
