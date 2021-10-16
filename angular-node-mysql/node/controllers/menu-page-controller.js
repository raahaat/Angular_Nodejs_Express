const { where } = require('sequelize');
const menuPageModel = require('../models/menu-page-list');



exports.getMenuPageByParent = async (req, res) => {
    let parentCode = req.params.parent_code
    menuPageModel.findAll(
        { where: { parent_code: parentCode}}
    )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
}; 


exports.getMenuPageList = async (req, res) => {
    menuPageModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};


exports.addMenuPage = async (req, res) => {
        
    const formData = {
        id            : req.body.id,
        company_code  : req.body.company_code,
        parent_code   : req.body.parent_code,
        page_code     : req.body.page_code,
        page_name     : req.body.page_name,
        icon_name     : req.body.icon_name,
        tool_tip      : req.body.tool_tip,
        routing_path  : req.body.routing_path,
        serial_no     : req.body.serial_no,
        insert_by     : req.body.insert_by,
        insert_date   : req.body.insert_date 
    };

    menuPageModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};


exports.getMenuPageById = async (req, res) => {
  let editId = req.params.id;
  
  menuPageModel.findOne(
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


exports.updateMenuPage = async (req, res) => {
    let updatedId = req.params.id;

    menuPageModel.update({
      parent_code   : req.body.parent_code,
      page_code     : req.body.page_code,
      page_name     : req.body.page_name,
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


exports.deleteMenuPage = async (req, res) => {
    let deleteId = req.params.id;
    
    menuPageModel.destroy(
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