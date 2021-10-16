const Daction = require('../models/disciplinary-action-model');
const empMaster = require('../models/cor-employee-master');
const earningHeadSetup = require('../models/earning-head-setup-model');
const designation = require('../models/designation-setup-model');
const branch = require('../models/branch-master-setup');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const sequelize = require('../database/db');
const { QueryTypes } = require('sequelize');


exports.getAllDaction = (req, res) => {
    console.log("querying");
    Daction.findAll()
    .then(getData  =>{
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.getAllEmp = async (req, res) => {
    await empMaster.findAll({attributes:['employee_code','employee_name']})
    .then(getData  =>{
        // console.log("result",getData);
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.getEmpById = async (req, res) => {
    id = req.params.id;
    // console.log("id -" ,id);
    empMaster.belongsTo(designation,{ foreignKey:'designation',targetKey:'designationCode'});
    empMaster.belongsTo(branch,{ foreignKey:'branch',targetKey:'branch_code'});
    
    await empMaster.findOne({attributes:['employee_name','designation','branch'],where:{employee_code:id},include:[{model: designation, attributes:['designationName']},{model: branch, attributes:['branch_name']}]})
    .then(getData  =>{
        all_data ={
            'employee_name':getData.employee_name,
            'designation': getData.designation,
            'branch': getData.branch,
            'designation_name': getData.con_designation.designationName,
            'branch_name': getData.con_com_branchmaster.branch_name
        };
        // console.log("result",all_data);
        res.json({isExecuted:true, data: all_data});
        res.end();
     });
}

exports.getEarnHead = async (req, res) => {
    await earningHeadSetup.findAll({attributes:['headCode','headName'],where:{headName:{[Op.like]:'% bonus'}}})
    .then(getData  =>{
        // console.log("result",getData);
        res.json({isExecuted:true, data: getData});
        res.end();
     });
}

exports.add = async (req, res) => {
    data  = req.body.data;
    Daction.create(data)
    .then((data)=> {
        res.json({message : 'Successfully inserted.'});
        res.end();
      }).catch((err)=> {
          console.log('Error',err);
      });
}

exports.delete= async (req, res) => {
    id = req.params.id;
    
    await Daction.destroy({where: {id: id}})
    .then((data)=> {
        res.json({message : 'Successfully deleted.'});
        res.end();
    }).catch((err)=> {
        console.log('Error',err);
    });
            
    
}

exports.edit = async (req, res) => {
    id = req.params.id;
    empMaster.belongsTo(designation,{ foreignKey:'designation',targetKey:'designationCode'});
    empMaster.belongsTo(branch,{ foreignKey:'branch',targetKey:'branch_code'});
    
    await Daction.findByPk(id,{attributes:['id','employee_code','bonus_type_code','effective_date','expire_date']})
    .then( async (data ) =>{
        await empMaster.findOne({attributes:['employee_code','employee_name','designation','branch'],where:{employee_code:data.employee_code},include:[{model: designation, attributes:['designationName']},{model: branch, attributes:['branch_name']}]})
        .then(getData  =>{
            all_data ={
                'id': data.id,
                'employee_code':getData.employee_code,
                'employee_name':getData.employee_name,
                'designation': getData.designation,
                'branch': getData.branch,
                'designation_name': getData.con_designation.designationName,
                'branch_name': getData.con_com_branchmaster.branch_name,
                'bonus_type_code': data.bonus_type_code,
                'effective_date':data.effective_date,
                'expire_date':data.expire_date
            };
            // console.log("result",all_data);
            res.json({isExecuted:true, data: all_data});
            res.end();
        });
       
     });
}

exports.update= async (req, res) => {
    
    data = req.body.data;
    const {bonus_type_code,effective_date,expire_date}=data;
    await Daction.update({bonus_type_code,effective_date,expire_date},{where: {id: data.id}},)
    .then(getData=>{
        res.json({message : 'Successfully updated.'});
        res.end();
    })
    .catch((err)=> {
        console.log('Error',err);
    });
            
    
}