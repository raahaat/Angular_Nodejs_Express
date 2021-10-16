const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');


exports.getTrainingData = async (req, res) => {
    let loginUser = req.params.pyostamp;
    let compCode = '200';
  
    await dbConnect.query(`SELECT (Select description from con_designations where company_code = a.pycomcde and designationCode = a.pydgscde) desgin,
                                  (SELECT branch_name
                                    FROM con_com_branchmaster
                                    WHERE company_code = a.pycomcde AND branch_code =  a.pybrancd) branch,
                                            pycrsdes tr_name,
                                            IF(PYINTEXT =  'I', 'Internal', 'External') tr_type,
                                            pycrsplc tr_place,
                                            pystrdte,
                                            pyenddte,
                                            pyenddte - pystrdte + 1 duration
                            FROM pytrnbak a
                           WHERE pycomcde = '${compCode}'
                             AND pyempcde = '${loginUser}'
                             AND PYINTEXT <> 'F'
                           Order by pyenddte Desc`,
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

  exports.getTrainingForeignData = async (req, res) => {
    let loginUser = req.params.pyostamp;
    let compCode = '200';
  
    await dbConnect.query(`SELECT (Select description from con_designations where company_code = a.pycomcde and designationCode = a.pydgscde) desgin,
                                  (SELECT branch_name
                                    FROM con_com_branchmaster
                                    WHERE company_code = a.pycomcde AND branch_code =  a.pybrancd) branch,
                                            pycrsdes tr_name,
                                            'Foreign' tr_type,
                                            pycrsplc tr_place,
                                            pystrdte,
                                            pyenddte,
                                            pyenddte - pystrdte + 1 duration
                            FROM pytrnbak a
                           WHERE pycomcde = '${compCode}'
                             AND pyempcde = '${loginUser}'
                             AND PYINTEXT = 'F'
                           Order by pyenddte Desc`,
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