// const express = require('express');
const oracledb = require('oracledb')
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');


exports.getKpi = async (req, res) => {
    let compCode = '200';
    let empId = req.params.employeeId;
  
    await dbConnect.query(`SELECT a.kpiyear kpiyear, SUM(a.selfmark) selfmark, SUM(a.finalmark) finalmark
                            FROM (  SELECT a.kpi_year           kpiyear,
                                        SUM(ifnull(c.self_mark,0))     selfmark,
                                        SUM(ifnull(c.final_mark,0))     finalmark
                                    FROM kpi_year a, kpi_details c
                                    WHERE a.company_code = '${compCode}'
                                    And a.company_code = c.company_code
                                    And a.kpi_year = c.kpi_year 
                                    AND c.employee_code = '${empId}'
                                GROUP BY a.kpi_year
                                UNION ALL
                                    SELECT a.kpi_year           kpiyear,
                                        SUM(ifnull(b.self_mark,0))     selfmark,
                                        SUM(ifnull(b.final_mark,0))     finalmark
                                    FROM kpi_year a, kpi_behavior b
                                    WHERE a.company_code = '${compCode}'
                                    And a.company_code = b.company_code
                                    And a.kpi_year = b.kpi_year 
                                    AND b.employee_code = '${empId}'
                                    GROUP BY a.kpi_year) a
                                    GROUP BY kpiyear
                                    ORDER BY kpiyear`,
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