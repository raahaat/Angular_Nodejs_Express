const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');

exports.getReportData = async (req, res) => {  
  let companyCode = '200';
  let reportId = req.body.report_id;

  let queryData = 
    await dbConnect.query(`SELECT reportCode
                         FROM menureports
                        Where compcode ='${companyCode}'
                          And id = ${reportId}`,
                      {type: QueryTypes.SELECT, plain : true})
                      .then((query)=> {
                        if (query) {
                          return query.reportCode;
                        } else {
                          return null;
                        }
                      })

  let reportParam = 
  await dbConnect.query(`SELECT a.data_type, a.parameter_code
                            FROM report_params_list a, report_params_setup b
                          Where b.company_code = '${companyCode}'
                            And b.report_id = ${reportId}
                            And a.company_code = b.company_code
                            And a.id = b.param_id
                        Order by a.id`,
                        {type: QueryTypes.SELECT})
                        .then((getData)=> {
                          return getData;
                        }).catch((err)=> {
                          console.log(`My Error: ${err}`);
                        })

    reportParam.push({"data_type": "CHR","parameter_code": ":company_code"});

    let value;
    for(let i = 0; i < reportParam.length; i++){
      let field = reportParam[i].parameter_code.substr(1);
      if(reportParam[i].data_type === 'CHR')
      {
        value = "'" + req.body[field] + "'";
      }
      else if (reportParam[i].data_type === 'DTE')
      {
        value = "DATE('" + req.body[field] + "')";        
      }      
      else if (reportParam[i].data_type === 'NUM')
      {
        value = req.body[field];
      }            

      const search = reportParam[i].parameter_code;
      const replacer = new RegExp(search, 'g');
      queryData = queryData.replace(replacer, value)
    }

    await dbConnect.query(queryData,
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

exports.getReportDisplayField = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;
  
  await dbConnect.query(`SELECT display_name text,'tableHeader' style
                           FROM report_display_list
                          Where company_code = '${companyCode}'
                            and report_id = ${reportId}
                            and IFNULL(show_on_report,'N') = 'Y'`,
                        {type: QueryTypes.SELECT})
                        .then((getData)=> {
                          if (getData) {
                            // console.log(getData);
                            res.json({isExecuted:true, data: getData});
                            res.end();
                          } else {
                            res.json(null);
                          }
                        }).catch((err)=> {
                          console.log(`My Error: ${err}`);
                        })
}; 

exports.getReportHeaderParcent = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT display_length text
                           FROM report_display_list
                          Where company_code = '${companyCode}'
                            and report_id = ${reportId}
                            and IFNULL(show_on_report,'N') = 'Y'
                          Order by serial_no`,
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

exports.getReportField = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT lower(query_display_name) display_name
                           FROM report_display_list
                          Where company_code = '${companyCode}'
                            and report_id = ${reportId}
                            and IFNULL(show_on_report,'N') = 'Y'
                          Order by serial_no`,
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

exports.getReportProperty = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT IFNULL(headerShow,'N') headershow, IFNULL(footerShow,'N') footershow, IFNULL(landscapeFlag,'N') landscapeshow,
                         IFNULL(headerBoldFlag,'N') headerbold, headerFontSize, headerColor, headerBackground,
                         mainHeaderText
                           FROM menureports
                          Where compcode = '${companyCode}'
                            and id = ${reportId}`,
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

exports.getGroupReportField = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT display_name,lower(query_display_name) header_value
                           FROM report_group_display_list
                          Where company_code = '${companyCode}'
                            and report_id = ${reportId}
                            and IFNULL(show_on_report,'N') = 'Y'
                          Order by serial_no`,
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

exports.getSingleGroupHeader = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT groupColumnDisplayName text,'tableHeader' style
                           FROM menureports
                          Where compcode = '${companyCode}'
                            And id = ${reportId}
                            and IFNULL(reporttype,'N') = 'F'
                            And IFNULL(groupDisplaySingle,'N') = 'S'`,
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

exports.getMultiGroupHeader = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT display_name text,'tableHeader' style
                           FROM report_group_display_list
                         Where company_code = '${companyCode}'
                           and report_id = ${reportId}
                           and IFNULL(show_on_report,'N') = 'Y'
                         Order by serial_no`,
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

exports.getSingleGroupHeaderPercent = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT groupDIsplayHEaderPercentage text
                           FROM menureports
                          Where compcode = '${companyCode}'
                            And id = ${reportId}
                            and IFNULL(reporttype,'N') = 'F'
                            And IFNULL(groupDisplaySingle,'N') = 'S'`,
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

exports.getMultiGroupHeaderPercent = async (req, res) => {
  let companyCode = '200'
  let reportId = req.params.id;

  await dbConnect.query(`SELECT display_length text
                           FROM report_group_display_list
                          Where company_code = '${companyCode}'
                            and report_id = ${reportId}
                            and IFNULL(show_on_report,'N') = 'Y'
                          Order by serial_no`,
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
