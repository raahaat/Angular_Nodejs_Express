const RiskAllowance = require('../models/pay-risk-allowance-model');
const empMaster = require('../models/cor-employee-master');
const earningHeadSetup = require('../models/earning-head-setup-model');

exports.getAll =async (req, res) => {
    RiskAllowance.belongsTo(empMaster,{ foreignKey:'employee_code',targetKey:'employee_code'});
    RiskAllowance.belongsTo(earningHeadSetup,{ foreignKey:'earning_code',targetKey:'headCode'});
    
    RiskAllowance.findAll({
        order: [
            ['effective_date', 'ASC'],
        ],
        include:[{model: empMaster, attributes:['employee_name']},{model: earningHeadSetup, attributes:['headName']}]
    }).then((getData) => {
        filterData = getData.map(data =>({
            "id": data.id,
            "company_code": data.company_code,
            "employee_code": data.employee_code,
            "earning_code": data.earning_code,
            "effective_date": data.effective_date,
            "expire_date": data.expire_date,
            "amount": data.amount,
            "active_flag": data.active_flag,
            "insert_by": data.insert_by,
            "insert_date": data.insert_date,
            "update_by": data.update_by,
            "update_date":data.update_date,
            "employee_name": data.cor_employee_master.employee_name,
            "headName": data.con_earn_head.headName
            
        }))
        res.json({isExecuted:true, data: filterData});
        res.end();     
    }).catch((err) => {
        res.send(err);
    });
}

exports.add = async (req, res) => {
    data  = req.body.data;
    RiskAllowance.create(data)
    .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });
}

exports.edit = async (req, res) => {
    id  = req.params.id;
    await RiskAllowance.findByPk(id)
    .then(getData  =>{
        console.log("result",getData);
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.update= async (req, res) => {
    
    data = req.body.data;
    console.log("daaaata", data);
    await RiskAllowance.update(data,{where: {id: data.id}},)
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
    
    await RiskAllowance.destroy({where: {id: id}})
    .then((data)=> {
        res.json({message : 'Successfully deleted.'});
        res.end();
    }).catch((err)=> {
        console.log('Error',err);
    });
            
    
}