const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');


exports.getMedicalData = async (req, res) => {
    let login_user = req.params.pyempcde;
    let comp_code = '200';
  
    await dbConnect.query(`Select concat(floor(height/12), '''', Mod(height,12), '''''') pyheight, 
                                  concat(weight, ' Kg') weight, if(blood_group = Null,Null,
                                  (Select description from con_code_master where company_code = a.company_code and soft_code = 'BG' and code = a.blood_group)) blood 
                             from cor_employee_master a
                            Where company_code = '${comp_code}'
                              And employee_code = '${login_user}'`,
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