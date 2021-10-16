const express = require('express');
const router = express.Router();

const allowanceController = require('../controllers/allowance-controller');

router.post('/allowance_type/post/', allowanceController.postAllowanceType);
router.get('/allowance_type/get/', allowanceController.getAllowanceMaster);
router.get('/allowance_type_view/get/', allowanceController.getAllowanceType);
router.delete('/allowance_type_view/delete/:id', allowanceController.deleteAllowanceType);
router.get('/allowance_type_view/fetch/:id', allowanceController.getAllowanceTypeById);
router.put('/allowance_type_view/update/:id', allowanceController.updateAllowanceType);
router.get('/allowance_type/get-max-type-code/', allowanceController.getMaxTypeCode);


module.exports = router;