const menuItemModel = require('../models/menuitem');

exports.getMenuItemList = async (req, res) => {
    menuItemModel.findAll(  
      { where: {compcode: '200'}}      
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};

exports.addMenuItem = async (req, res) => {
        
    const formData = {
      id          : req.body.id,
      compcode    : req.body.compcode,
      menupath    : req.body.menupath,
      menuname    : req.body.menuname,
      menuicon    : req.body.menuicon,
      menuserl    : req.body.menuserl,
      menutype    : req.body.menutype,
      reqtauth    : req.body.reqtauth,
      createby    : req.body.createby,
      createdt    : req.body.createdt 
    };

    menuItemModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};

exports.getMenuItemById = async (req, res) => {
  let editId = req.params.id;

  menuItemModel.findOne(
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

exports.getMenuItemAll = async (req, res) => {
  menuItemModel.findAll({
    attributes: ['id','menuname'],
    where: {
      compcode: '200'
    }
  })
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
  })
};

exports.updateCompanyList = async (req, res) => {
    let updatedId = req.params.id;

    menuItemModel.update({
      menupath   : req.body.menupath,
      menuname   : req.body.menuname,
      menuicon   : req.body.menuicon,
      menutype   : req.body.menutype
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


exports.deleteMenuItem = async (req, res) => {
    let deleteId = req.params.id;
    
    menuItemModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Menu Item is not deleted for : "+ deleteId});
        res.end();
    });
};
