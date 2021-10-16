const express = require('express');
const { QueryTypes } = require('sequelize');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');


exports.getFamilyInfo = async (req, res) => {
    let company_code = '200';
    let user_code = req.params.pyostamp;

  // let emp_br_div = 
  // await dbConnect.query(`Select branch, division
  //                          From cor_employee_master
  //                         Where company_code = '${compCode}'
  //                           And employee_code = '${oStamp}'`,
  //         {type: QueryTypes.SELECT});

  await dbConnect.query(`SELECT IFNULL (father_name, 'No data') father_name,
                                'No data' father_occu,
                                'No data' father_org,
                                IFNULL (mother_name, 'No data') mother_name,
                                'No data' mother_occu,
                                'No data' mother_org,
                                'No data' sibling,
                                if(a.marital_status = NULL, NULL, (select description from con_code_master 
                              where company_code = a.company_code
                              and hard_code = 'MS'
                              and code = a.marital_status)) marital,
                                IFNULL (spouse_name, 'No data') spouse_name,
                                'No data' spouse_occu,
                                'No data' spouse_org,
                                'No data' children,
                                (SELECT concat(ifnull(addrln01,''),' ', ifnull(addrln02,''),' ', ifnull(addrln03,''),' ', ifnull(addrcity,''))
                                  FROM pyaddmas
                                  WHERE compcode = a.company_code
                                    AND addrtype = 'AY001' 
                                    AND emplcode = a.employee_code) present_add,
                                (SELECT concat(ifnull(addrln01,''),' ', ifnull(addrln02,''),' ', ifnull(addrln03,''),' ', ifnull(addrcity,''))
                                  FROM pyaddmas
                                  WHERE compcode = a.company_code
                                    AND addrtype = 'AY002' 
                                    AND emplcode = a.employee_code) permanent_add
                        FROM cor_employee_master a
                       WHERE company_code = '${company_code}'
                         AND employee_code = '${user_code}'`,
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

// exports.getFamilyInfo = async (req, res) => {

//     let company_code = '200';
//     let user_code = req.params.pyostamp;
//     let connection
    
//     try {
//       connection = await oracledb.getConnection(dbConnect);

//       const result = await connection.execute(
//         `SELECT NVL (INITCAP (fathrnam), 'No data') father_name,
//                 'No data' father_occu,
//                 'No data' father_org,
//                 NVL (INITCAP (mothrnam), 'No data') mother_name,
//                 'No data' mother_occu,
//                 'No data' mother_org,
//                 'No data' sibling,
//                 DECODE(pymartst, NULL, NULL, INITCAP (dpr_code_desc ('999', pymartst))) marital,
//                 NVL (INITCAP (pyspsnam), 'No data') spouse_name,
//                 'No data' spouse_occu,
//                 'No data' spouse_org,
//                 'No data' children,
//                 (SELECT INITCAP (addrln01||' '|| addrln02||' '|| addrln03||' '|| addrcity)
//                   FROM pyaddmas
//                   WHERE compcode = :compcode
//                     AND addrtype = 'AY001' 
//                     AND emplcode = :loginUser) present_add,
//                 (SELECT INITCAP (addrln01||' '|| addrln02||' '|| addrln03||' '|| addrcity)
//                   FROM pyaddmas
//                   WHERE compcode = :compcode
//                     AND addrtype = 'AY002' 
//                     AND emplcode = :loginUser) permanent_add
//            FROM pyempmas
//           WHERE pycomcde = :compcode
//             AND pyempcde = :loginUser`,
//         {compcode: company_code, loginUser: user_code}   
//       );

//     res.json({isExecuted:true, familyData: result.rows[0], message:"Employee List fetched successfully."});
        
//     } catch (err) {
//       console.log('Ouch!', err);
//         res.json({isExecuted:false, message:"Error to get branch wise emp list."});
//     } finally {
//       if (connection) { 
//         await connection.close();
//       }
//     }
// }
