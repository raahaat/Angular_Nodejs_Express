// const selfMenuModel = require('../models/self-service-menu');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

exports.getSelfMenuList = async (req, res) => {

await dbConnect.query(`SELECT menus.level, menus.id, menus.name as name, menus.parentId as parent_id, menus.menupath, menus.menu_icon as menuicon, menus.menuleaf, menus.menuserl FROM selfservice_menu AS menus where parentId is not null order by menus.level,menus.menuserl`,
      {type: QueryTypes.SELECT})
      .then((getData)=> {
        if (getData) {

          var data = getData;
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

          // res.json({isExecuted:true, data: getData});
          res.end();
        } else {
          res.json(null);
        }
      }).catch((err)=> {
        console.log(`My Error: ${err}`);
      })
};

