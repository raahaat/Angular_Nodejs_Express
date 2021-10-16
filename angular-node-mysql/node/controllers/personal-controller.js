const { QueryTypes } = require('sequelize');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');


exports.getEmployeeList = async (req, res) => {
    let oStamp = req.params.pyostamp;
    let compCode = '200';
    let gComCode = '999';
    let conn
  
    let emp_br_div = 
    await dbConnect.query(`Select branch, division
                             From cor_employee_master
                            Where company_code = '${compCode}'
                              And employee_code = '${oStamp}'`,
            {type: QueryTypes.SELECT});

    await dbConnect.query(`Select a.employee_code, a.employee_name name, d.designationName, a.branch, a.division
                            From cor_employee_master a, con_com_branchmaster b , ph_empstatus c, con_designations d
                            Where a.company_code = '${compCode}'
                                And c.COMPCDE = a.company_code
                                And c.COMPCDE = d.company_code
                                And a.company_code = b.company_code
                                And a.branch = b.branch_code
                                And c.HRDCDE = 'ST'
                                And c.HEADCODE = a.emp_status
                                And c.DOPPRO = 'Y'
                                And d.hard_code = 'DG'
                                And d.designationCode = a.designation
                                And d.designationRank is not null
                                And a.employee_code <> '${oStamp}'
                                And a.branch = '${emp_br_div[0]['branch']}'
                                And a.division = if('${emp_br_div[0]['branch']}' = '100',
                                                    '${emp_br_div[0]['division']}',a.division)
                                Order by d.designationRank, a.join_date`,
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

  exports.getEmployeeData = async (req, res) => {
    let userId = req.params.pyostamp;
    let compCode = '200';
  
    await dbConnect.query(`Select username, a.division pygrdcde, b.usercode, 
                                    employee_name pyempnam, (select designationName from con_designations
                                        Where company_code = a.company_code
                                        and designationCode = a.designation) designation,
                                    IF(a.branch = '100',
                                            (select gradeName from con_grades
                                        Where company_code = a.company_code
                                        and gradeCode = a.division), 
                                        (Select branch_name
                                            From con_com_branchmaster 
                                            Where company_code = a.company_code 
                                            And branch_code = a.branch)) pydepcde,email pyofmail, 
                                    IFNULL((Select faxnumbr 
                                            From pyaddmas 
                                            Where compcode = a.company_code
                                            And emplcode = a.employee_code
                                            And addrtype = 'AY001'), (Select faxnumbr 
                                                                        From pyaddmas 
                                                                        Where compcode = a.company_code 
                                                                            And emplcode = a.employee_code
                                                                            And addrtype = 'AY002')) phone
                                From cor_employee_master a, user_master b
                                Where a.company_code = '${compCode}'
                                And a.employee_code = '${userId}'
                                And b.usercode = a.employee_code`,
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