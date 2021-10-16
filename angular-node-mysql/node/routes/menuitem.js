const express = require('express');
const menuItemInfo = require('../controllers/menuitems');
const router = express.Router();

router.get('/menu-item/list', menuItemInfo.getMenuItemList);
router.post('/menu-item/add', menuItemInfo.addMenuItem);
router.get('/menu-item/fetch/:id', menuItemInfo.getMenuItemById);
router.delete('/menu-item/delete/:id', menuItemInfo.deleteMenuItem);
router.put('/menu-item/update/:id', menuItemInfo.updateCompanyList);
router.get('/menu-item/all', menuItemInfo.getMenuItemAll);



module.exports = router;