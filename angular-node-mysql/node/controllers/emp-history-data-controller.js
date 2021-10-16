const empGrowthModel = require('../models/employee-growth');
const empGrowthDetailsModel = require('../models/employee-growth-details');
const branchModel = require('../models/branch-master-setup');
const designationModel = require('../models/designation-setup-model');
const empMasterModel = require('../models/cor-employee-master');
const gradeModel = require('../models/emp-grade-setup-model');
const departmentModel = require('../models/con-department');
const documentModel = require('../models/test-document-master');
const Sequelize = require('sequelize');
const { Op } = require("sequelize");


exports.fetchGrowthData = async (req, res) => {

    const empId = req.params.employee_code;
    const compCode = '200'

    empGrowthModel.belongsTo(branchModel,{ foreignKey:'new_branch',targetKey:'branch_code'});
    empGrowthModel.belongsTo(gradeModel,{ foreignKey:'new_grade',targetKey:'gradeCode'});
    empGrowthModel.belongsTo(departmentModel,{ foreignKey:'new_division',targetKey:'dept_code'});
    empGrowthModel.belongsTo(designationModel,{ foreignKey:'new_designation',targetKey:'designationCode'});        
    empGrowthModel.belongsTo(empMasterModel,{ foreignKey:'employee_code',targetKey:'employee_code'});
    empGrowthModel.belongsTo(documentModel,{ foreignKey:'document_type',targetKey:'document_type'});

    empGrowthModel.findAll({
        where: {company_code: compCode, employee_code: empId},
        order: ['effective_date','document_date'],
        include: [
            {model: branchModel, attributes: ['branch_name']},
            {model: designationModel, attributes:['designationName']},
            {model: gradeModel, attributes:['gradeName']},
            {model: departmentModel, attributes:['description']},
            {model: empMasterModel, attributes:['employee_name']},
            {model: documentModel, attributes:['document_desc']}
        ]
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })     
};

exports.growtDetailshByDoc = async (req, res) => {

    const empId = req.query.employee_code;
    const docNumber = req.query.document_number;
    const compCode = '200'

    empGrowthDetailsModel.findAll({
        where: {company_code: compCode, employee_code: empId, document_number: docNumber},
        order: [Sequelize.literal('SUBSTRING(earn_deduct_code, 1, 2) DESC'),
                Sequelize.literal('SUBSTRING(earn_deduct_code,3) ASC')]
    })
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end(); 
    })
    .catch((err)=> {
     console.log(err);
    })     
};

exports.updateGrowDetails = async (req, res) => {
    const compCode = '200';
    const objKeys = Object.keys(req.body.obj);

    try {
         for (let i = 0; i < objKeys.length; i++) { 
            let id = req.body.obj[objKeys[i]].id;
            const formData = {     
                company_code      : req.body.obj[objKeys[i]].company_code ,
                employee_code     : req.body.obj[objKeys[i]].employee_code,
                document_date     : req.body.obj[objKeys[i]].document_date,
                document_number   : req.body.obj[objKeys[i]].document_number,     
                document_sub_type : req.body.obj[objKeys[i]].document_sub_type,     
                document_type     : req.body.obj[objKeys[i]].document_type,     
                earn_deduct_code  : req.body.obj[objKeys[i]].earn_deduct_code,     
                effective_date    : req.body.obj[objKeys[i]].effective_date,     
                new_amount        : req.body.obj[objKeys[i]].new_amount,     
                old_amount        : req.body.obj[objKeys[i]].old_amount,     
                pr_flag           : req.body.obj[objKeys[i]].pr_flag,     
                dependsOnAttendance    : req.body.obj[objKeys[i]].dependsOnAttendance,     
                insert_by         : req.body.obj[objKeys[i]].insert_by ,  
                insert_date       : req.body.obj[objKeys[i]].insert_date,
                update_by         : req.body.obj[objKeys[i]].update_by ,  
                update_date       : req.body.obj[objKeys[i]].update_date  
            };
            
            if (id) {
               await empGrowthDetailsModel.update(
                    {new_amount  : req.body.obj[objKeys[i]].new_amount,
                     old_amount  : req.body.obj[objKeys[i]].old_amount,
                     update_by   : req.body.update_by,
                     update_date : req.body.update_date},
                    {where: {
                        id              : id,
                        company_code    : compCode, 
                        employee_code   : req.body.obj[objKeys[i]].employee_code,
                        earn_deduct_code: req.body.obj[objKeys[i]].earn_deduct_code,
                        document_number : req.body.obj[objKeys[i]].document_number}
                    }
                    ).catch (err => {
                    console.log(err);
                 })
            } else {
               await empGrowthDetailsModel.create(formData);
            }  
         }

      res.json({isExecuted:true, message:"Data successfully updated!"});
      res.end();
    } catch (err){
      res.json({ isExecuted: false, message: "Unknown Error: " + err });
      res.end();
    }
};


exports.updateEmpGrowth = async (req, res) => {
    const compCode = '200';
    const id = req.body.id;
    try {
        await empGrowthModel.update(
              { effective_date  : req.body.effective_date,
                document_date   : req.body.document_date,
                release_date    : req.body.release_date,
                new_designation : req.body.new_designation,
                new_branch      : req.body.new_branch,
                new_grade       : req.body.new_grade,
                new_division    : req.body.new_division,
                update_by       : req.body.update_by,
                update_date     : req.body.update_date},
            {where: {
                id              : id,
                company_code    : compCode, 
                employee_code   : req.body.employee_code,
                document_number : req.body.document_number}
            }
            ).catch (err => {
            console.log(err);
            })

      res.json({isExecuted:true, message:"Data successfully updated!"});
      res.end();
    } catch (err){
      res.json({ isExecuted: false, message: "Unknown Error: " + err });
      res.end();
    }
};
   

exports.deleteGrowDetails = async (req, res) => {
   let deleteId = req.params.id;
   await empGrowthDetailsModel.destroy(
      { where: {id: deleteId}}
    ).then(() => {
          res.json({isExecuted:true, message: "Data successfully deleted!!!"});
          res.end();
        }
    ).catch(err => {
        res.json({isExecuted:false, message: "Data could not be deleted!!!"});
        res.end();
    });
};