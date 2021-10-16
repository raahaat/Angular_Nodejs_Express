const CodeMasterModel = require('../models/con-code-master');
const kpiHistoryModel = require('../models/kpi-history');
const kpiBehaviorModel = require('../models/kpi-behavior');
const kpiMasterModel = require('../models/kpi-master');
const kpiDetailModel = require('../models/kpi-details');
const kpiYearModel = require('../models/kpi-year');
const empMasterModel = require('../models/cor-employee-master');
const branchModel = require('../models/branch-master-setup');
const designationModel = require('../models/designation-setup-model');
const Sequelize = require ('sequelize');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');
// const dateformat = require('dateformat');
// const kpi_year = require('../models/k');

// exports.getCodeMasterList = (req, res) => {

    // console.log("got");
const { Op } = require ('sequelize');

exports.getCodeMasterList = (req, res) => {
    CodeMasterModel.findAll({where: {hard_code:['KT','JP','OB','PB']}})
    .then((data) => {
        let KT = [];
        let JP = [];
        let OB = [];
        let PB = [];
        data.forEach(element => {
            if(element.hard_code =="KT"){
                KT.push(element);
            }
            if(element.hard_code =="JP"){
                JP.push(element);
            }
            if(element.hard_code =="OB"){
                OB.push(element);
            }
            if(element.hard_code =="PB"){
                PB.push(element);
            }
        }); 
        return res.json({isExecuted:true,  data: {kt: KT, jp:JP, ob:OB, pb: PB} });

    }).catch((err) => {
        res.send(err);
        console.log('Add grade Error: ', err);
    })
}

exports.getKpiAppListByID = async (req, res) => {
    let compCode = '200';
    let empId = req.params.id;
    //let empId = '001293';
  
    await dbConnect.query(`Select a.employee_code,
                                  (Select employee_name from cor_employee_master where company_code = a.company_code and employee_code = a.employee_code) employee_name,
                                  (Select branch_name From con_com_branchmaster where company_code = a.company_code and branch_code = a.branch) branch_name, 
                                  (Select shortName from con_designations where company_code = a.company_code and designationCode = a.designation) designation_name, 
                                  (Select description From con_grades Where company_code = a.company_code and gradeCode = a.division) division_name, 
                                  DATE_FORMAT(a.period_from, '%d/%m/%Y') period_from, DATE_FORMAT(a.period_to, '%d/%m/%Y') period_to,
                                  a.kpi_status,
                                  a.kpi_year as "group",
                                  IF(a.kpi_status = 'CLO', 'Closed', IF(a.kpi_status = 'FIN', 'Employee Acceptance Pending',IF(a.kpi_status = 'APR', 'Assessment Pending',''))) kpi_status_name
                             From kpi_master a
                            Where a.company_code = '${compCode}'
                              And a.rater1 = '${empId}'
                              And a.kpi_status <> 'RAS'
                              And a.final_flag = 'Y'
                         Order by a.kpi_year desc, a.kpi_status, a.employee_code`,
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

  exports.getKpiMasterDataByID = async (req, res) => {
    console.log(req.body);
    let compCode = '200';
    let employee_id = req.body.employee_code;
    let kpi_period_from = req.body.period_from;
    let kpi_period_to = req.body.period_to;
    let kpi_status = req.body.kpi_status;
    let kpi_year = req.body.group;
  
    await dbConnect.query(`Select id, a.company_code, a.employee_code, (Select employee_name from cor_employee_master where company_code = a.company_code and employee_code = a.employee_code) employee_name,
                                  a.branch,(Select branch_name From con_com_branchmaster where company_code = a.company_code and branch_code = a.branch) branch_name, 
                                  a.department, a.designation,(Select shortName from con_designations where company_code = a.company_code and designationCode = a.designation) designation_name, 
                                  a.category, a.division,(Select description From con_grades Where company_code = a.company_code and gradeCode = a.division) division_name, 
                                  a.period_from, DATE_FORMAT(a.period_from, '%d/%m/%Y') display_period_from, 
                                  a.period_to, DATE_FORMAT(a.period_to, '%d/%m/%Y') display_period_to,
                                  a.employee_date, DATE_FORMAT(a.employee_date, '%d/%m/%Y') req_employee_date,
                                  a.approval_date, a.recommend, a.remark1, a.remark2, a.rater1, a.rater2, a.employee_acceptance,
                                  a.kpi_status, a.kpi_year, a.kpi_group, a.functional_title, a.job_portfolio, a.final_flag,
                                  a.company_mark, a.comity, a.company_remark,                                  
                                  a.insert_by,
                                  a.insert_date,
                                  IF(a.kpi_status = 'CLO', 'Closed', IF(a.kpi_status = 'FIN', 'Employee Acceptance Pending',IF(a.kpi_status = 'APR', 'Assessment Pending',''))) kpi_status_name
                             From kpi_master a
                            Where a.company_code = '${compCode}'
                              And a.employee_code = '${employee_id}'
                              And a.kpi_status = '${kpi_status}'
                              And a.final_flag = 'Y'
                              And DATE_FORMAT(a.period_from, '%d/%m/%Y') = '${kpi_period_from}'
                              And DATE_FORMAT(a.period_to, '%d/%m/%Y') = '${kpi_period_to}'
                              And a.kpi_year = '${kpi_year}'`,
                          {type: QueryTypes.SELECT})
                          .then((getData)=> {
                            if (getData) {
                              res.json(getData);
                              res.end();
                            } else {
                              res.json(null);
                            }
                          }).catch((err)=> {
                            console.log(`My Error: ${err}`);
                          })
  };

  exports.getKpiOBBehaviourByID = async (req, res) => {
    let compCode = '200';
    let employee_id = req.body.employee_code;
    let kpi_period_from = req.body.period_from;
    let kpi_period_to = req.body.period_to;
    let kpi_status = req.body.kpi_status;
    let kpi_year = req.body.group;
  
    await dbConnect.query(`Select id,company_code,'D' kpi_data,a.behavior_code,
                                  (Select description from con_code_master where company_code = a.company_code 
                                      and hard_code = 'OB' And code = a.behavior_code) behavior_name,
                                  a.score,
                                  a.self_mark,
                                  a.final_mark,
                                  a.insert_by,
                                  a.insert_date,
                                  a.employee_code,
                                  a.period_from,
                                  a.period_to,
                                  a.kpi_year,
                                  a.behavior_type
                             From kpi_behavior a
                            Where a.company_code = '${compCode}'
                              And a.employee_code = '${employee_id}'
                              And DATE_FORMAT(a.period_from, '%d/%m/%Y') = '${kpi_period_from}'
                              And DATE_FORMAT(a.period_to, '%d/%m/%Y') = '${kpi_period_to}'
                              And a.kpi_year = '${kpi_year}'
                              And a.behavior_type = 'OB'
                              Order by a.behavior_code`,
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

  exports.getKpiPBBehaviourByID = async (req, res) => {
    let compCode = '200';
    let employee_id = req.body.employee_code;
    let kpi_period_from = req.body.period_from;
    let kpi_period_to = req.body.period_to;
    let kpi_status = req.body.kpi_status;
    let kpi_year = req.body.group;
  
    await dbConnect.query(`Select id,company_code,'D' kpi_data,a.behavior_code,
                                  (Select description from con_code_master where company_code = a.company_code 
                                      and hard_code = 'PB' And code = a.behavior_code) behavior_name,
                                  a.score,
                                  a.self_mark,
                                  a.final_mark,
                                  a.insert_by,
                                  a.insert_date,
                                  a.employee_code,
                                  a.period_from,
                                  a.period_to,
                                  a.kpi_year,
                                  a.behavior_type
                             From kpi_behavior a
                            Where a.company_code = '${compCode}'
                              And a.employee_code = '${employee_id}'
                              And DATE_FORMAT(a.period_from, '%d/%m/%Y') = '${kpi_period_from}'
                              And DATE_FORMAT(a.period_to, '%d/%m/%Y') = '${kpi_period_to}'
                              And a.kpi_year = '${kpi_year}'
                              And a.behavior_type = 'PB'
                              Order by a.behavior_code`,
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

  exports.getKpiMainHeadByID = async (req, res) => {
    let compCode = '200';
    let employee_id = req.body.employee_code;
    let kpi_period_from = req.body.period_from;
    let kpi_period_to = req.body.period_to;
    let kpi_status = req.body.kpi_status;
    let kpi_year = req.body.group;
  
    await dbConnect.query(`Select id, a.company_code, a.employee_code, 
                                  a.period_from,
                                  a.period_to,
                                  a.kpi_year,
                                  a.kpi_group,
                                  a.kpi_code,
                                  (Select description from con_code_master where company_code = a.company_code 
                                    and hard_code = 'KT' And code = a.kpi_code) kpi_name,
                                  a.maximum_mark,
                                  a.target_score,
                                  a.self_mark,
                                  a.final_mark,
                                  a.serial,
                                  a.insert_by,
                                  a.insert_date 
                             From kpi_details a
                            Where company_code = '${compCode}'
                              And employee_code = '${employee_id}'
                              And DATE_FORMAT(period_from, '%d/%m/%Y') = '${kpi_period_from}'
                              And DATE_FORMAT(period_to, '%d/%m/%Y') = '${kpi_period_to}'
                              And kpi_year = '${kpi_year}'
                            Order by serial`,
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

  exports.getKpiSubHeadByID = async (req, res) => {
    let compCode = '200';
    let employee_id = req.body.employee_code;
    let kpi_period_from = req.body.period_from;
    let kpi_period_to = req.body.period_to;
    let kpi_status = req.body.kpi_status;
    let kpi_year = req.body.group;
  
    await dbConnect.query(`Select id, company_code, employee_code, period_from, period_to, kpi_year, kpi_group,
                                  insert_by, insert_date,
                                  'D' kpi_data,
                                  kpi_code,
                                  head_name,
                                  head_serial,
                                  IF(child_flag = 'Y','Y',Null) child_flag,
                                  paten_code,
                                  child_name,
                                  child_serial,
                                  target_type,
                                  quantity_no,
                                  target,
                                  achievement,
                                  achive_no,
                                  score,
                                  self_score,
                                  final_score       
                             From kpi_history a
                            Where company_code = '${compCode}'
                              And employee_code = '${employee_id}'
                              And DATE_FORMAT(period_from, '%d/%m/%Y') = '${kpi_period_from}'
                              And DATE_FORMAT(period_to, '%d/%m/%Y') = '${kpi_period_to}'
                              And kpi_year = '${kpi_year}'                              
                              Order by head_serial,child_serial`,
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

  exports.setKpiEvaluationMarks = async (req, res) => { 
    let kpiSubHead = req.body.subKpiMarks;
    let kpiOB = req.body.obAssesment;
    let kpiPB = req.body.pbAssesment;
    let kpiMasterInfo = req.body.masterKpiInfo;
    let kpiSubHeadMarks = req.body.subKpiHeadMarks;

    console.log(kpiMasterInfo);
    
    for(let i=0; i < kpiSubHead.length; i++)
    {
      if (kpiSubHead[i]['kpi_data'] === 'T'){
        for(let j=0; j < kpiSubHeadMarks.length; j++)
        {
          if (kpiSubHead[i]['kpi_code'] === kpiSubHeadMarks[j]['kpi_code'])
          {
            kpiSubHeadMarks[j]['final_mark'] = kpiSubHead[i]['final_score'];
          }
        }
        
        kpiSubHead.splice(i,1); 
        i--;        
      }
    }

    for(let i=0; i < kpiOB.length; i++)
    {
      if (kpiOB[i]['kpi_data'] === 'T'){
        kpiOB.splice(i,1);         
      }
    }
    
    for(let i=0; i < kpiPB.length; i++)
    {
      if (kpiPB[i]['kpi_data'] === 'T'){
        kpiPB.splice(i,1);         
      }
    }

   try {
       let updateID = req.body.masterKpiInfo.employee_code;
       let fromDate = req.body.masterKpiInfo.period_from;
       let toDate   = req.body.masterKpiInfo.period_to;
       let kpi_year = req.body.masterKpiInfo.kpi_year;
       let companyCode = '200';              

   await kpiMasterModel.update(kpiMasterInfo,
               {where: {
                company_code: companyCode,
                employee_code: updateID,
                period_from: fromDate,
                period_to: toDate,
                kpi_year: kpi_year
               }})    
   
   await kpiBehaviorModel.bulkCreate(kpiOB, { updateOnDuplicate: Object.keys(kpiBehaviorModel.rawAttributes)})
   await kpiBehaviorModel.bulkCreate(kpiPB, { updateOnDuplicate: Object.keys(kpiBehaviorModel.rawAttributes)})
   await kpiHistoryModel.bulkCreate(kpiSubHead, { updateOnDuplicate: Object.keys(kpiHistoryModel.rawAttributes)})
   await kpiDetailModel.bulkCreate(kpiSubHeadMarks, { updateOnDuplicate: Object.keys(kpiDetailModel.rawAttributes)})

   return res.json({isExecuted: true, message: 'Successfully Updated!'})
   } catch (err) {
       console.log(err);
   }
}

exports.kpiApply = async (req,res) => {
  try {
      console.log(req.body);
    let kpiOB = req.body.obAssesment;
    let kpiPB = req.body.pbAssesment;
    // let OBList = [];
    // let PBList = [];

    // await kpiOB.forEach(ob=> {
    //     if (ob.self_mark >= 0 && ob.self_mark !== null) {
    //         console.log(ob.self_mark);
    //         OBList.push(ob);
    //     }
    // })  

    // await kpiPB.forEach(pb=> {
    //     if (pb.self_mark >= 0 && pb.self_mark !== null) {
    //         PBList.push(pb);
    //     }
    // }) 

    let success =
     await kpiMasterModel.create(req.body.formData)
      .then(save => {
          return save.id;
      });
    if (success && success > 0) {
        const objKeys = Object.keys(req.body.dataList);
        for (let i = 0; i < objKeys.length; i++) {
           await kpiHistoryModel.bulkCreate(req.body.dataList[i]);
        }
        if (kpiOB !== []) {
            await kpiBehaviorModel.bulkCreate(kpiOB);
        }
        if (kpiPB !== []) {
            await kpiBehaviorModel.bulkCreate(kpiPB);
        }
        if (req.body.kpiCodeMark !== []) {
            await kpiDetailModel.bulkCreate(req.body.kpiCodeMark);
        }
    }    
    return res.json({isExecuted: true, message: 'Kpi successfully applied'})
  } catch (err) {
      console.log(err);
      return res.json({isExecuted: false, message: err})
  }
}

exports.getKpiYear = async (req, res) => {
    try {
        let kpiYearDetails = 
        await kpiYearModel.findAll({
            where: {
                company_code: '200',
                year_status: 'ACT'
            }
        })
        return res.json({data: kpiYearDetails, count: kpiYearDetails.length})
    } catch (err) {
        console.log('Kpi Year Error: ',err);
    }
}

exports.getKpiDataByUser = async (req, res) => {    
    try {
        let user = req.params.id;
        let companyCode = '200';

        kpiMasterModel.belongsTo(branchModel,{ foreignKey:'branch',targetKey:'branch_code'});
        kpiMasterModel.belongsTo(designationModel,{ foreignKey:'designation',targetKey:'designationCode'});        
        kpiMasterModel.belongsTo(empMasterModel,{ foreignKey:'employee_code',targetKey:'employee_code'});
      
        let kpiData = 
        await kpiMasterModel.findAll({
            attributes: ['id', 'employee_code','branch', 'designation', 'period_from','period_to','kpi_status','kpi_year','final_flag'],
            where: {
                company_code: companyCode,
                employee_code: user
            },
            order: [
                ['kpi_year', 'DESC'],
                ['period_from', 'DESC'],
            ],
            include:[
              {model: designationModel, attributes:['designationName']},
              {model: branchModel, attributes:['branch_name']},
              {model: empMasterModel, attributes:['employee_name']}
            ]                
        })
        let getData = 
        await kpiData.map(data=> ({
            'id' : data.id,
            'employee_code' : data.employee_code,
            'employee_name' : data.cor_employee_master.employee_name,
            'branch' : data.con_com_branchmaster.branch_name,
            'designation' : data.con_designation.designationName,
            'period_from' : data.period_from,
            'period_to' : data.period_to,
            'kpi_status' : data.kpi_status,
            'group' : data.kpi_year,
            'final_flag': data.final_flag
        }))
        return res.json(getData)
    } catch (err) {
        console.log('Kpi Error: ',err);
    }
}

exports.getKpiDataForEdit = async (req, res) => {    
    try {
        let userId = req.params.id;
        let companyCode = '200';
        let OBehavior=[];
        let PBehavior=[];

        let kpiMaster = 
        await kpiMasterModel.findOne(
            {where: {
                company_code: companyCode,
                id: userId
            }}
        )

        let kpiHistory = 
        await kpiHistoryModel.findAll(
            {where: {
                company_code: companyCode,
                employee_code: kpiMaster.employee_code,
                period_from: kpiMaster.period_from,
                period_to: kpiMaster.period_to,
                kpi_year: kpiMaster.kpi_year
            }}
        )
        
        let kpiDetails = 
        await kpiDetailModel.findAll(
            {where: {
                company_code: companyCode,
                employee_code: kpiMaster.employee_code,
                period_from: kpiMaster.period_from,
                period_to: kpiMaster.period_to,
                kpi_year: kpiMaster.kpi_year
            }}
        )

        let kpiBehavior = 
        await kpiBehaviorModel.findAll(
            {where: {
                company_code: companyCode,
                employee_code: kpiMaster.employee_code,
                period_from: kpiMaster.period_from,
                period_to: kpiMaster.period_to,
                kpi_year: kpiMaster.kpi_year
            }}
        )

        kpiBehavior.forEach(element => {
          if (element.behavior_type == 'OB') {
             OBehavior.push(element);  
          }
          if (element.behavior_type == 'PB') {
             PBehavior.push(element);  
          }
        })

        return res.json({kpiMaster,kpiHistory,kpiDetails,OBehavior,PBehavior})
    } catch (err) {
        console.log('Kpi Error: ',err);
    }
}

exports.updateKpi = async (req, res) => {
    try {
        let updateID = req.params.id;
        let companyCode = '200';
        let kpiOB = req.body.obAssesment;
        let kpiPB = req.body.pbAssesment;
        let formData = req.body.formData;
        let kpiCodeMark = req.body.kpiCodeMark;
        let kpiDataList = req.body.dataList;
        const objKeys = Object.keys(req.body.dataList);
    await kpiMasterModel.update(formData,
                {where: {
                    id: updateID
                }})    
    await kpiBehaviorModel.bulkCreate(kpiOB, { updateOnDuplicate: Object.keys(kpiBehaviorModel.rawAttributes)}) 
    await kpiBehaviorModel.bulkCreate(kpiPB, { updateOnDuplicate: Object.keys(kpiBehaviorModel.rawAttributes)}) 
    await kpiDetailModel.bulkCreate(kpiCodeMark, { updateOnDuplicate: Object.keys(kpiDetailModel.rawAttributes)})     
    for (let i = 0; i < objKeys.length; i++) {
        await kpiHistoryModel.bulkCreate(req.body.dataList[i],
             { updateOnDuplicate: Object.keys(kpiHistoryModel.rawAttributes)});
    }

    return res.json({isExecuted: true, message: 'Successfully Updated!'})
    } catch (err) {
        console.log(err);
    }
}

exports.deleteKpiHistoryById = async (req, res) => {
    try {
        let companyCode = '200'
        let deletedId = req.params.id;
        await kpiHistoryModel.destroy({
            where: {
                company_code: companyCode,
                id: deletedId
            }
        })        
        return res.json({isExecuted: true, message: 'Deleted successfully!'})
    } catch (err) {
        console.log(err);
        res.json({isExecuted: false, message: 'Error to delete this data!'})
    }    
}

exports.getDuplicateKPIApply = async (req, res) => {
    try {
     let companyCode = '200';

     let duplicateCount = 
     await kpiMasterModel.findAll({
       where: {
         company_code: companyCode,
         employee_code: req.query.employee_code,
         kpi_year: req.query.kpi_year,
         period_from: req.query.period_from,
         period_to: req.query.period_to,
         kpi_status: {[Op.ne]: 'CAN'}
       }
     })
     if (duplicateCount.length > 0) {
       return res.json({isExecuted: false, data: duplicateCount.length, message: 'Duplicate entry found with this date combination!'});
     } else {
       return res.status(200).json({isExecuted: true, message: 'No duplicate entry found!'});
     }
    } catch(err) {
      console.log(err);
      return res.json({isExecuted: false, message: 'Error occured when checking duplicate entry!'});
    }
   }

   exports.getKpiAcceptanceListByID = async (req, res) => {
    let compCode = '200';
    let empId = req.params.id;
    // let empId = '001293';
    // '000163';
    // console.log(empId);
  
    await dbConnect.query(`SELECT a.company_code,
                                  a.designation,
                                  a.division,
                                  a.employee_code,
                                  a.kpi_year as "group",
                                  DATE_FORMAT(a.period_from, '%d/%m/%Y') period_from,
                                  DATE_FORMAT(a.period_to, '%d/%m/%Y') period_to,
                                  a.pyrater1,
                                  a.remark1,
                                  a.PYINDSCR,
                                  a.PYINDSLF,
                                  a.PYINDFIN,
                                  a.PYBEHSCR,
                                  a.PYBEHSLF,
                                  a.PYBEHFIN,
                                  a.employee_acceptance,
                                  a.PYTOTMRK,
                                  a.final_flag,
                                  a.kpi_status
                              FROM (
                                SELECT DISTINCT
                                              company_code,
                                              employee_code,
                                              designation,
                                              division,
                                              kpi_year,
                                              period_from,
                                              period_to,
                                              (SELECT employee_name
                                                  FROM cor_employee_master
                                                WHERE company_code = x.company_code AND employee_code = x.rater1)
                                                  pyrater1,
                                              remark1,
                                              final_flag,
                                              kpi_status,
                                              (SELECT Sum(total_mark)
                                                  FROM kpi_mark_details
                                                WHERE company_code = x.company_code
                                                  And parent_name = 'AM001')
                                                  PYINDSCR,
                                              (SELECT SUM(self_mark)
                                                  FROM kpi_details
                                                WHERE     company_code = x.company_code
                                                      AND employee_code = x.employee_code
                                                      AND period_from = x.period_from
                                                      AND period_to = x.period_to
                                                      AND kpi_year = x.kpi_year)
                                                  PYINDSLF,
                                              (SELECT SUM(final_mark)
                                                  FROM kpi_details
                                                WHERE     company_code = x.company_code
                                                      AND employee_code = x.employee_code
                                                      AND period_from = x.period_from
                                                      AND period_to = x.period_to
                                                      AND kpi_year = x.kpi_year)
                                                  PYINDFIN,
                                              (SELECT Sum(total_mark)
                                                  FROM kpi_mark_details
                                                WHERE company_code = x.company_code
                                                  And parent_name <> 'AM001')
                                                  PYBEHSCR,
                                              (SELECT SUM(self_mark)
                                                  FROM kpi_behavior k, con_code_master l
                                                WHERE     k.company_code = x.company_code
                                                      AND k.employee_code = x.employee_code
                                                      AND l.company_code = k.company_code
                                                      AND l.hard_code IN ('PB', 'OB')
                                                      AND k.behavior_code = l.code
                                                      AND l.hard_code = k.behavior_type
                                                      AND k.period_from = x.period_from
                                                      AND k.period_to = x.period_to
                                                      AND k.kpi_year = x.kpi_year)
                                                  PYBEHSLF,
                                              (SELECT SUM(final_mark)
                                                  FROM kpi_behavior k, con_code_master l
                                                WHERE     k.company_code = x.company_code
                                                      AND k.employee_code = x.employee_code
                                                      AND l.company_code = k.company_code
                                                      AND l.hard_code IN ('PB', 'OB')
                                                      AND k.behavior_code = l.code
                                                      AND l.hard_code = k.behavior_type
                                                      AND k.period_from = x.period_from
                                                      AND k.period_to = x.period_to
                                                      AND k.kpi_year = x.kpi_year)
                                                  PYBEHFIN,
                                              employee_acceptance,
                                              (  (SELECT SUM(final_mark)
                                                    FROM kpi_details
                                                    WHERE     company_code = x.company_code
                                                          AND employee_code = x.employee_code
                                                          AND period_from = x.period_from
                                                          AND period_to = x.period_to
                                                          AND kpi_year = x.kpi_year)
                                                + (SELECT SUM(final_mark)
                                                    FROM kpi_behavior k, con_code_master l
                                                    WHERE     k.company_code = x.company_code
                                                          AND k.employee_code = x.employee_code
                                                          AND l.company_code = k.company_code
                                                          AND l.hard_code IN ('PB', 'OB')
                                                          AND k.behavior_code = l.code
                                                          AND l.hard_code = k.behavior_type
                                                          AND k.period_from = x.period_from
                                                          AND k.period_to = x.period_to
                                                          AND k.kpi_year = x.kpi_year))
                                                  PYTOTMRK
                            FROM kpi_master x
                          Where company_code = '${compCode}'
                            And employee_code = '${empId}'
                            And IFNULL(final_flag,'N') = 'Y'
                            And kpi_status In ('FIN','CLO')) a
                            Order by a.kpi_year desc`,
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

  exports.postKpiAcceptanceByID = async (req, res) => {
    let compCode = req.body.company_code;
    let empId = req.body.employee_code;
    let period_from = req.body.period_from;
    let period_to = req.body.period_to;
    let kpi_year = req.body.group;
    let acc_value = req.body.new_acceptance;
    let kpi_ststus = req.body.new_kpi_status;

    await dbConnect.query(`Update kpi_master
                              Set employee_acceptance = '${acc_value}',
                                  kpi_status = '${kpi_ststus}'
                            Where company_code = '${compCode}'
                              And employee_code = '${empId}'
                              And DATE_FORMAT(period_from, '%d/%m/%Y') = '${period_from}'
                              And DATE_FORMAT(period_to, '%d/%m/%Y') = '${period_to}'
                              And kpi_year = '${kpi_year}'`,
                          {type: QueryTypes.UPDATE})
                          .then((getData)=> {
                            if (getData) {
                              res.json({isExecuted:true, message: 'Data Save Successfully'});
                              res.end();
                            } else {
                              res.json(null);
                            }
                          }).catch((err)=> {
                            console.log(`My Error: ${err}`);
                          })
  };
