const express = require('express');
const confirmExtendController = require('../controllers/confirm-date-extend-controller');

const router = express.Router();

router.get('/confirm-extend/list', confirmExtendController.getConfirmDateExtend);
router.post('/confirm-extend/add', confirmExtendController.addConfirmDateExtend);
router.get('/confirm-extend/fetch/:id', confirmExtendController.getConfirmDateExtendById);
router.put('/confirm-extend/update/:id', confirmExtendController.updateConfirmDateExtend);
router.delete('/confirm-extend/delete/:id', confirmExtendController.deleteConfirmDateExtend);
router.get('/confirm-extend/emp-probation-list', confirmExtendController.getEmpProbationList);

module.exports = router;
