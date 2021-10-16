const express = require('express');
const menuSubModules = require('../controllers/menu-sub-modules-controller');

const router = express.Router();


router.get('/menu-sub-modules/by-parent/:subMenu', menuSubModules.getMenuSubModulesByParent);
router.get('/menu-sub-modules/list', menuSubModules.getMenuSubModules);
router.post('/menu-sub-modules/add', menuSubModules.addMenuSubModules);
router.get('/menu-sub-modules/fetch/:id', menuSubModules.getMenuSubModulesById);
router.put('/menu-sub-modules/update/:id', menuSubModules.updateMenuSubModules);
router.delete('/menu-sub-modules/delete/:id', menuSubModules.deleteMenuSubModules);



module.exports = router;