const menuReportModel = require('../models/menureport');
const paramsListModel = require('../models/report-param-list');
const paramsSetupModel = require('../models/report-param-setup');
const reportDisplayModel = require('../models/report-display-list');
const groupReportDisplayModel = require('../models/report-group-display-list');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

exports.getMenuReportAll = async (req, res) => {
  let searchId = req.params.id;
  //console.log(searchId);

  menuReportModel.findAll(  
      { where: {compcode: '200', parentId: searchId}}      
    )
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
    })
};

exports.getMenuReportList = async (req, res) => {

await dbConnect.query(`SELECT a.id, a.name, a.parentId parentId,(select name from menus where id = a.parentId)  parentName
                        FROM menus a, menuitems b
                       WHERE a.menuitem_id = b.id
                         and b.menutype = 'R'`,
                        {type: QueryTypes.SELECT})
                        .then((getData)=> {
                          if (getData) {
                            res.json({isExecuted:true, data: getData});
                            res.end();
                          } else {
                            res.json(null);
                          }
                        }).catch((err)=> {
                          console.log(`My Error: ${err}`);
                        })
};

// exports.addMenuReport = async (req, res) => {
        
//     const formData = {
//       id          : req.body.id,
//       compcode    : req.body.compcode,
//       menupath    : req.body.menupath,
//       menuname    : req.body.menuname,
//       menuicon    : req.body.menuicon,
//       menuserl    : req.body.menuserl,
//       menutype    : req.body.menutype,
//       reqtauth    : req.body.reqtauth,
//       createby    : req.body.createby,
//       createdt    : req.body.createdt 
//     };

//     menuReportModel.create(formData)
//     .then((data)=> {
//       res.json({message : 'Successfully inserted.'});
//       res.end();
//     }).catch((err)=> {
//         console.log('Error');
//     })
// };

// exports.getMenuReportById = async (req, res) => {
//   let editId = req.params.id;

//   menuReportModel.findOne(
//       { where: {id: editId}}
//     )
//   .then(editData => {
//     res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
//     res.end();
//     })
//   .catch(err => {
//     res.json({isExecuted:false, message: "Error to get data."});
//     res.end();
//   });
// };

// exports.getMenuReportAll = async (req, res) => {
//     menuReportModel.findAll({
//     attributes: ['id','reportname'],
//     where: {
//       compcode: '200'
//     }
//   })
//     .then(getData => {  
//         res.json({isExecuted:true, data: getData});
//         res.end();     
//   })
// };

// exports.updateMenuReport = async (req, res) => {
//     let updatedId = req.params.id;

//     menuReportModel.update({
//       menupath   : req.body.menupath,
//       menuname   : req.body.menuname,
//       menuicon   : req.body.menuicon,
//       menutype   : req.body.menutype
//     }, {where: {id: updatedId}}
//     )

//     .then((updated)=> {
//       res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
//       res.end();
//     })
//     .catch (err => {
//       res.json({isExecuted:false, message:"Unknown Error: "+ err});
//       res.end();
//     })
// };


// exports.deleteMenuReport = async (req, res) => {
//     let deleteId = req.params.id;
    
//     menuReportModel.destroy(
//       { where: {id: deleteId}}
//     )
//     .then(deletedData => {
//           res.json({isExecuted:true, data: deletedData});
//           res.end();
//         })
//       .catch(err => {
//         res.json({isExecuted:false, message: "Menu Item is not deleted for : "+ deleteId});
//         res.end();
//     });
// };

exports.getReportParamList = async (req, res) => {
  let companyCode = '200'
  paramsListModel.findAll({ 
    where: { 
      company_code: companyCode
    },
    order: [
      ['param_name', 'ASC']
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
}; 


exports.addReportParams = async (req, res) => {
  let reportId;
  let paramArray = req.body.times;
  let displayArray = req.body.display_property;
  let groupDisplayArray = req.body.group_display_property;

  const reportData = {
    compcode  : req.body.company_code,
    parentId  : req.body.parent_id,
    reportname: req.body.report_name,
    mainHeaderText: req.body.report_header_text,
    reportserl: req.body.report_srl,
    reporttype: req.body.report_type,
    reportCode: req.body.report_code,
    groupQuery: req.body.group_query_code,
    groupCodeParam: req.body.group_code_param,
    groupDisplaySingle: req.body.group_display_type,
    groupColumnDisplayName: req.body.group_dispaly_name,
    groupDIsplayHEaderPercentage: req.body.group_display_lenght,
    headerShow: req.body.header_show,
    footerShow: req.body.footer_show,
    landscapeFlag: req.body.page_type,
    headerBoldFlag: req.body.header_blod_flag,
    headerFontSize: req.body.header_font_size,
    headerColor: req.body.header_color,
    headerBackground: req.body.header_backgroud_color,
    createby  : req.body.insert_by,
    createdt  : req.body.insert_date    
  };

  await menuReportModel.create(reportData)
  .then((data)=> {
    reportId = data.id;

    paramArray.map(data => {
      data.report_id = reportId;
    });

    displayArray.map(data => {
      data.report_id = reportId;
    });

    groupDisplayArray.map(data => {
      data.report_id = reportId;
    });

    paramsSetupModel.bulkCreate(paramArray)    
    .catch((err)=> {
      return res.json({isExecuted:false, message: 'Error Insering in report_params_setup Table'});
    })

    reportDisplayModel.bulkCreate(displayArray)
    .catch((err)=> {
      return res.json({isExecuted:false, message: 'Error Insering in report_display_list Table'});
    })
    
    if (req.body.report_type === 'G' || req.body.report_type === 'F')
      {
        groupReportDisplayModel.bulkCreate(groupDisplayArray)
        .catch((err)=> {
          return res.json({isExecuted:false, message: 'Error Insering in report_group_display_list Table'});
        })
      }
    
  return res.json({isExecuted:true, message: 'Data Save Successfully'});
  }) 
};

exports.getReportInfoById = async (req, res) => {
  let editId = req.params.id;
  let companyCode = '200';
  
  try {      
      let menuReport =
        await menuReportModel.findOne(
            { where: {
              compcode: companyCode,
              id: editId
            }
          })
      
      let reportParams = 
       await paramsSetupModel.findAll(
            { where: {
              company_code: companyCode,
              report_id: editId
           }
       })
      
      let reportDisplayList = 
       await reportDisplayModel.findAll(
        { where: {
          company_code: companyCode,
          report_id: editId
        }
      })
     
      let reportGroupDisplayList = 
       await groupReportDisplayModel.findAll(
        { where: {
          company_code: companyCode,
          report_id: editId
        }
      })

      return res.json({editData: menuReport,reportParams, reportDisplayList, reportGroupDisplayList}); 
  
    } catch (err) {
      console.log(err);
      return res.json({isExecuted:false, message: "Error to get data."});
    }
      
  };
