const OutstationDuty = require('../models/cor-outstation-duty-model');
const empMaster = require('../models/cor-employee-master');
const { QueryTypes } = require('sequelize');
const dbConnect = require('../database/db');
const companyCode = '200';

// exports.getAll =async (req, res) => {
//     OutstationDuty.belongsTo(empMaster,{foreignKey:'approver_code',targetKey:'employee_code'});
    
//     OutstationDuty.findAll({
//         order: [
//             ['apply_date', 'ASC'],
//         ],
//         include:[{model: empMaster, attributes:['employee_name']}]
//     }).then((getData) => {
//         filterData = getData.map(data =>({
//             "id": data.id,
//             "company_code": data.company_code,
//             "employee_code": data.employee_code,
//             "apply_for": data.apply_for,
//             "apply_date": data.apply_date,
//             "absent_from": data.absent_from,
//             "absent_to": data.absent_to,
//             "approver_code": data.approver_code,
//             "apply_status": data.apply_status,
//             "remark": data.remark,
//             "approver_comment": data.approver_comment,
//             "approver_date": data.approver_date,
//             "reason": data.reason,
//             "insert_by": data.insert_by,
//             "insert_date": data.insert_date,
//             "update_by": data.update_by,
//             "update_date": data.update_date,
//             "approver_name": data.cor_employee_master.employee_name,
//             "employee_name": 'Ms. Rokeya Begum 2'
            
//         }))
//         res.json({isExecuted:true, data: filterData});
//         res.end();     
//     }).catch((err) => {
//         res.send(err);
//     })
// }



exports.getAll = async (req, res) => { 
    try {
      let empList = 
      await dbConnect.query(
        `SELECT b.id,
                b.employee_code,
                a.employee_name,
                b.apply_for,
                b.apply_date,
                b.absent_from,
                b.absent_to,
                b.approver_code,
                (SELECT employee_name
                FROM cor_employee_master
                WHERE company_code = b.company_code
                    AND employee_code = b.approver_code)
                approver_name,
                b.apply_status,
                b.remark,
                b.approver_comment,
                b.approver_date,
                b.reason,
                CASE b.reason
                WHEN 'RE001' THEN 'Duty On Client Side'
                WHEN 'RE002' THEN 'On Training'
                WHEN 'RE003' THEN 'Office From Home'
                WHEN 'RE004' THEN 'Punch Not Created'
                WHEN 'RE005' THEN 'Software Presentation'
                WHEN 'RE006' THEN 'Visit Abroad'
                ELSE ''
                END
                AS reason_name
         FROM cor_employee_master a, cor_outstation_duty b
        WHERE b.company_code = ${companyCode} 
          AND a.company_code = b.company_code 
          AND a.employee_code = b.employee_code
        ORDER BY b.apply_date`,
        { type: QueryTypes.SELECT }
      );
  
      res.json({isExecuted: true, data: empList});
      res.end(); 
  
    } catch {
      res.json({isExecuted: false, message: 'Error when fetching employee leave data..'});
      res.end(); 
    }
};


exports.add = async (req, res) => {
    data  = req.body.data;
    console.log("daaata" ,data);
    OutstationDuty.create(data)
    .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });
}

exports.edit = async (req, res) => {
    id  = req.params.id;
    await OutstationDuty.findByPk(id)
    .then(getData  =>{
        console.log("result",getData);
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.update= async (req, res) => {
    
    data = req.body.data;
    await OutstationDuty.update(data,{where: {id: data.id}},)
    .then(getData=>{
        res.json({message : 'Successfully updated.'});
        res.end();
    })
    .catch((err)=> {
        console.log('Error',err);
    });
            
    
}

exports.delete= async (req, res) => {
    id = req.params.id;
    
    await OutstationDuty.destroy({where: {id: id}})
    .then((data)=> {
        res.json({message : 'Successfully deleted.'});
        res.end();
    }).catch((err)=> {
        console.log('Error',err);
    });
            
    
}