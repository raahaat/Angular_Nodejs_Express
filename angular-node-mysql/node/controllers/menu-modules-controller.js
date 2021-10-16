const menuModulesModel = require('../models/menu-modules');


exports.getMenuModules = async (req, res) => {
    menuModulesModel.findAll({
        where: {company_code: '200'}
    })
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};

exports.getMenuModuleName = async (req, res) => {
    let menuModulename = req.params.menuName;
    menuModulesModel.findAll({
        where: {
            company_code: '200',
            menu_code: menuModulename
        }
    })
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};