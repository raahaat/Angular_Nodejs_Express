const menuReportModel = require('../models/menureport');
const paramsSetupModel = require('../models/report-param-setup');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');


exports.getReportListByModule = async (req, res) => {
    let companyCode = '200'
    let menuId = req.params.id;
    
    menuReportModel.findAll({ 
        where: { 
            compcode: companyCode,
            parentId: menuId
        },
        order: [
            ['reportserl', 'ASC']
        ]
    })
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
}; 


exports.getParamListByReport = async (req, res) => {

    let companyCode = '200'
    let reportId = req.params.reportId;

    paramsSetupModel.findAll({ 
        attributes: ['param_id'],
        where: { 
            company_code: companyCode,
            report_id: reportId
        },
        order: [
            ['serial_no', 'ASC']
        ]
    })
    .then(getData => {  
      res.json({isExecuted:true, data: getData});
      res.end();     
    })
}; 

// exports.getMenuReportList = async (req, res) => {

// await dbConnect.query(`SELECT a.id, a.name, a.parentId parentId,(select name from menus where id = a.parentId)  parentName
//                         FROM menus a, menuitems b
//                        WHERE a.menuitem_id = b.id
//                          and b.menutype = 'R'`,
//                         {type: QueryTypes.SELECT})
//                         .then((getData)=> {
//                           if (getData) {
//                             res.json({isExecuted:true, data: getData});
//                             res.end();
//                           } else {
//                             res.json(null);
//                           }
//                         }).catch((err)=> {
//                           console.log(`My Error: ${err}`);
//                         })
// };