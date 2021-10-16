const menuSubModulesModel = require('../models/menu-sub-modules');




exports.getMenuSubModulesByParent = async (req, res) => {
  let subMenu = req.params.subMenu;
  console.log(subMenu);
  menuSubModulesModel.findAll(
      { where: { parent_code: subMenu}}
  )
  .then(getData => {  
      res.json({isExecuted:true, data: getData});
      res.end();     
  })
}; 


exports.getMenuSubModules = async (req, res) => {
    menuSubModulesModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};


exports.addMenuSubModules = async (req, res) => {
        
    const formData = {
        id            : req.body.id,
        company_code  : req.body.company_code,
        parent_code   : req.body.parent_code,
        menu_code     : req.body.menu_code,
        menu_name     : req.body.menu_name,
        icon_name     : req.body.icon_name,
        tool_tip      : req.body.tool_tip,
        routing_path  : req.body.routing_path,
        serial_no     : req.body.serial_no,
        insert_by     : req.body.insert_by,
        insert_date   : req.body.insert_date 
    };

    menuSubModulesModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};


exports.getMenuSubModulesById = async (req, res) => {
  let editId = req.params.id;
  
  menuSubModulesModel.findOne(
      { where: {id: editId}}
    )
  .then(editData => {
    res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};


exports.updateMenuSubModules = async (req, res) => {
    let updatedId = req.params.id;

    menuSubModulesModel.update({
      // id          : req.body.id,
      // company_code: req.body.company_code,
      parent_code   : req.body.parent_code,
      menu_code     : req.body.menu_code,
      menu_name     : req.body.menu_name,
      icon_name     : req.body.icon_name,
      tool_tip      : req.body.tool_tip,
      routing_path  : req.body.routing_path,
      serial_no     : req.body.serial_no,
      update_by     : req.body.update_by,
      update_date   : req.body.update_date 
    }, {where: {id: updatedId}}
    )

    .then((updated)=> {
      res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
};


exports.deleteMenuSubModules = async (req, res) => {
    let deleteId = req.params.id;
    
    menuSubModulesModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Exam Result is not deleted for : "+ deleteId});
        res.end();
    });
};