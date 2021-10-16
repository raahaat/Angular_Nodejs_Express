const express = require('express');
const empCategoryController = require('../controllers/emp-category-controller');

const router = express.Router();

router.get('/emp-category/view', empCategoryController.getEmpCategoryList);
router.post('/emp-category/add', empCategoryController.addEmpCategory);
router.delete('/emp-category/delete/:id', empCategoryController.deleteEmpCategory);
router.get('/emp-category/fetch/:id', empCategoryController.getEmpCategoryById);
router.put('/emp-category/update/:id', empCategoryController.updateEmpCategory);
router.get('/emp-category/count', empCategoryController.countEmpCategory);


module.exports = router;
