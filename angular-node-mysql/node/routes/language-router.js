const express = require('express');
const languageController = require('../controllers/language-controller');
const router = express.Router();


router.get('/languages', languageController.getAllLanguages);
router.get('/language/:id', languageController.getSingleLanguage);
router.post('/add-language', languageController.addLanguage);
router.delete('/delete-language/:id', languageController.deleteLanguageById);
router.put('/edit-language/:id', languageController.editLanguageById);

module.exports = router;