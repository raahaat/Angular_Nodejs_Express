const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancy-controller');

router.post('/vacancy-type/add', vacancyController.addVacancy);
router.get('/vacancy/list',vacancyController.getVacancyList);
router.get('/vacancy/fetch/:id',vacancyController.getVacanyById);
router.put('/vacancy/update/:id',vacancyController.updateVacancyType);
router.delete('/vacancy/delete/:id', vacancyController.deleteVacancyType);
module.exports = router;
