const express = require('express');
const companyListController = require('../controllers/company-list-controller');

const router = express.Router();

router.get('/company-list/list', companyListController.getCompanyList);
router.post('/company-list/add', companyListController.addCompanyList);
router.get('/company-list/fetch/:id', companyListController.getCompanyListById);
router.put('/company-list/update/:id', companyListController.updateCompanyList);
router.delete('/company-list/delete/:id', companyListController.deleteCompanyList);
router.get('/company-list/duplicate/:soft_code', companyListController.duplicateCheck);
router.get('/company-list/count', companyListController.countCompany);


module.exports = router;
