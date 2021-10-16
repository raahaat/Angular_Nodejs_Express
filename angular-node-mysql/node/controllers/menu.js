const menuModel = require('../models/menu');

//const con = require('../database/db');
exports.addMenuTree = async (req, res) => {

  const formData = {
    id          : req.body.id,
    level       : req.body.level,
    name        : req.body.name,
    parentId    : req.body.parent_id,
    menuitem_id : req.body.menuitem_id,
    menuleaf    : req.body.menuleaf,
    menuicon    : req.body.menuicon
  };

  menuModel.create(formData)
  .then((data)=> {
    res.json({message : 'Successfully inserted.'});
    res.end();
  }).catch((err)=> {
      console.log('Error on Inserting');
  })
};

exports.getMenuTreeById = async (req, res) => {
  let editId = req.params.id;
  
  menuModel.findAll(
      { where: {parentId: editId},
      order: [
        ['menuserl', 'ASC']
      ]}
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

exports.getMenuTreeEditById = async (req, res) => {
  data =  req.body;
  
  await menuModel.bulkCreate(data, { updateOnDuplicate: ["menuserl"] })
   .then((data)=> {
        res.json({message : 'Successfully Updated...'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });
  
};

exports.deleteMenuTree = async (req, res) => {
  console.log('tanver');

    // let deleteId = req.params.id;
    
    // leaveTypeModel.destroy(
    //   { where: {id: deleteId}}
    // )
    // .then(deletedData => {
    //       res.json({isExecuted:true, data: deletedData});
    //       res.end();
    //     })
    //   .catch(err => {
    //     res.json({isExecuted:false, message: "Division Zone is not deleted for : "+ deleteId});
    //     res.end();
    // });
};

exports.menuList = async (req, res) => {
    var mysql = require('mysql');
    
    var con = mysql.createConnection({
      host: "10.11.201.154",
      user: "orbhrm",
      password: "orbhrm",
      database: "people_hub"
    });
    
    con.connect(function(err) {
        if (err) throw err;
        var sql = "SELECT menus.level, menus.id, IFNULL(menuitems.menuname,menus.name) as name, menus.parentId as parent_id, menuitems.menupath,menuitems.menutype, menus.menu_icon as menuicon, menus.menuleaf, menus.menuserl FROM (SELECT level, id, name, parentId, menuitem_id,menuleaf, menu_icon, menuserl FROM menus AS menus where parentId is not null) AS menus LEFT OUTER JOIN menuitems AS menuitems ON menuitems.id = menuitem_id order by menus.level,menus.menuserl";
        con.query(sql, function (err, result) {
          if (err) throw err;
          else
          {        
            var data = result;
            data.push({"level":-1,"id":1,"name":"Home"});
    
            tree = function (data, root) {
                var t = {};
                data.forEach(o => {
                    Object.assign(t[o.id] = t[o.id] || {}, o);
                    t[o.parent_id] = t[o.parent_id] || {};
                    t[o.parent_id].children = t[o.parent_id].children || [];
                    t[o.parent_id].children.push(t[o.id]);
                });
                return t[root].children;
            }(data, undefined);
        
            res.json(tree)
          }
        });
      });
};
