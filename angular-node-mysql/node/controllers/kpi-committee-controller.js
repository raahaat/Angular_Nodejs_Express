const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const kpiMasterModel = require('../models/kpi-master');
const kpiDetailsModel = require('../models/kpi-details');
const kpiBehaviorModel = require('../models/kpi-behavior');


exports.getKpiData = async (req, res) => { 
 try {
  let compCode = '200';
  let kpiCompany = 
   await dbConnect.query(`Select a.employee_code , a.employee_name name, c.designationName designation, d.branch_name branch,
                           e.kpi_year , e.period_from , e.period_to , e.company_mark , e.comity, e.company_remark
                      From cor_employee_master a, ph_empstatus b, con_designations c, con_com_branchmaster d,kpi_master e
                     Where a.company_code = '${compCode}'
                       And a.company_code = d.company_code
                       And c.company_code = a.company_code
                       And c.company_code = b.compcde
                       And a.branch = d.branch_code		
                       And a.company_code = e.company_code
                       And a.employee_code = e.employee_code
                       And b.doppro = 'Y'
                       And a.emp_status = b.headcode
                       And c.designationRank Is Not Null
                       And a.designation = c.designationCode								 
                       And e.kpi_year = '${req.query.year}'
                       And e.kpi_status = 'CLO'
                       And a.branch = (CASE WHEN '${req.query.branch}' = 'All' THEN a.branch ELSE '${req.query.branch}' END)
                       And a.division = (CASE WHEN '${req.query.division}' = 'All' THEN a.division ELSE '${req.query.division}' END)
                       And a.employee_code = (CASE WHEN '${req.query.employeeCode}' = 'All' THEN a.employee_code ELSE '${req.query.employeeCode}' END)
                       And c.designationRank between ${req.query.desigFrom} and ${req.query.desigTo}
                     Order by c.designationRank, c.soft_code, a.employee_code`, 
                   {type: QueryTypes.SELECT})
  
    let countData = kpiCompany.length;
    if (countData > 0) {
      kpiCompany.forEach(async(element,index)=> {
        let detailsSelfSum =
        await kpiDetailsModel.sum('self_mark', { 
              where: { 
                company_code : compCode,
                employee_code : element.employee_code,
                kpi_year: element.kpi_year,
                period_from: element.period_from,
                period_to: element.period_to 
                } 
            })

        let behaviorSelfSum =
        await kpiBehaviorModel.sum('self_mark', { 
              where: { 
                company_code : compCode,
                employee_code : element.employee_code,
                kpi_year: element.kpi_year,
                period_from: element.period_from,
                period_to: element.period_to 
                } 
            }) 
            
        let detailsFinalSum =
        await kpiDetailsModel.sum('final_mark', { 
              where: { 
                company_code : compCode,
                employee_code : element.employee_code,
                kpi_year: element.kpi_year,
                period_from: element.period_from,
                period_to: element.period_to 
                } 
            })

        let behaviorFinalSum =
        await kpiBehaviorModel.sum('final_mark', { 
              where: { 
                company_code : compCode,
                employee_code : element.employee_code,
                kpi_year: element.kpi_year,
                period_from: element.period_from,
                period_to: element.period_to 
                } 
            })     

       kpiCompany[index].self_mark = detailsSelfSum + behaviorSelfSum;    
       kpiCompany[index].final_mark = detailsFinalSum + behaviorFinalSum;  

      if (countData == (index+1)) {
        return res.json({ isExecuted: true, data: kpiCompany, message: "Data fetched successfully!" });
      }       
    })
    } else {
      return res.json({ isExecuted: true, data: kpiCompany, message: "No data found!" });
    }     
  } catch (err) {
    console.log(err);
    return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
}


exports.updateKpiCommittee = async (req, res) => { 
  try {
   let companyCode = '200';
   let updatedData = req.body;

   if (updatedData.length > 0) {
      updatedData.forEach(element => {
        if (element.comity !== null ||
            element.company_mark !== null || 
            element.company_remark !== null) {
          kpiMasterModel.update({
              company_mark: element.company_mark == ''? null : element.company_mark, 
              comity : element.comity, 
              company_remark : element.company_remark
            },
            {
              where: {
              company_code: companyCode,
              employee_code: element.employee_code,
              kpi_year: element.kpi_year,
              period_from: element.period_from,
              period_to: element.period_to,
              kpi_status: 'CLO'
            }
            })
        }
      })
   }

   return res.json({ isExecuted: true, message: "Successfully Updated!" });
  } catch (err) {
    console.log(err);
    return res.json({isExecuted: false, message: 'Error to update!'})
  }
}