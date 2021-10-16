const express = require('express');
const menuModulesController = require('../controllers/menu-modules-controller');

const router = express.Router();

router.get('/menu-modules/list', menuModulesController.getMenuModules);
router.get('/menu-modules/:menuName', menuModulesController.getMenuModuleName);

module.exports = router;