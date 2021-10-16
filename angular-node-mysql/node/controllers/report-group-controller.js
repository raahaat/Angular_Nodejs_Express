const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes, col } = require('sequelize');

exports.getReportGroupData = async (req, res) => {  
  let companyCode = '200';
  let reportId = req.body.report_id;

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

  let querySql = 
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

  reportParam.push({"data_type": "CHR","parameter_code": ":company_code"});

  let value;
  for(let i = 0; i < reportParam.length; i++){
      let field = reportParam[i].parameter_code.substr(1);

      // let value = req.body[field];
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
      querySql = querySql.replace(replacer, value);
  }

  let groupSql = 
  await dbConnect.query(`SELECT groupQuery
                        FROM menureports
                      Where compcode ='${companyCode}'
                        And id = ${reportId}`,
                    {type: QueryTypes.SELECT, plain : true})
                    .then((query)=> {
                      if (query) {
                        return query.groupQuery;
                      } else {
                        return null;
                      }
                    })
  
  let value1;
  for(let i = 0; i < reportParam.length; i++){
    let field1 = reportParam[i].parameter_code.substr(1);

    // let value1 = req.body[field1];
    if(reportParam[i].data_type === 'CHR')
      {
        value1 = "'" + req.body[field1] + "'";
      }
      else if (reportParam[i].data_type === 'DTE')
      {
        value1 = "DATE('" + req.body[field1] + "')";        
      }      
      else if (reportParam[i].data_type === 'NUM')
      {
        value1 = req.body[field1];
      }  

    const search1 = reportParam[i].parameter_code;
    const replacer1 = new RegExp(search1, 'g');
    groupSql = groupSql.replace(replacer1, value1);
  }
  
  let groupColumn = 
    await dbConnect.query(`SELECT groupCodeParam
                         FROM menureports
                        Where compcode ='${companyCode}'
                          And id = ${reportId}`,
                      {type: QueryTypes.SELECT, plain : true})
                      .then((query)=> {
                        if (query) {
                          return query.groupCodeParam;
                        } else {
                          return null;
                        }
                      });
  
  let groupData = 
    await dbConnect.query(groupSql,
                      {type: QueryTypes.SELECT})                
  
  for(let i = 0; i < groupData.length; i++){
    let field2 = groupColumn.substr(1);
    let value2 = '"' + groupData[i][field2] + '"';
    exeQuerySql = querySql.replace(groupColumn, value2);

    let groupExeData = 
    await dbConnect.query(exeQuerySql,
                    {type: QueryTypes.SELECT});

    groupData[i].groupdata = groupExeData;
  }

  res.json({isExecuted:true, data: groupData});
};