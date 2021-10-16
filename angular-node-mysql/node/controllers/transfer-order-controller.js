const transferOrderModel = require('../models/cor-transfer-order');
const earnDeductModel =  require('../models/Earn-deduct-code');
const empMasterModel = require("../models/cor-employee-master");
const divisionMoel = require('../models/emp-grade-setup-model');
const departmentModel = require('../models/con-department');
const branchModel = require('../models/branch-master-setup');
const dbConnect = require('../database/db');
const { QueryTypes } = require('sequelize');



exports.getTransferOrderList = async (req, res) => {
  let companyCode = '200';
  // console.log("id -" ,id);
  transferOrderModel.belongsTo(branchModel,{ foreignKey:'old_branch',targetKey:'branch_code'});
  transferOrderModel.belongsTo(branchModel,{ foreignKey:'new_branch',targetKey:'branch_code'});
  transferOrderModel.belongsTo(divisionMoel,{ foreignKey:'new_division',targetKey:'gradeCode'});
  transferOrderModel.belongsTo(departmentModel,{ foreignKey:'new_department',targetKey:'dept_code'});
  transferOrderModel.belongsTo(empMasterModel,{ foreignKey:'employee_code',targetKey:'employee_code'});
  
  await transferOrderModel.findAll({attributes:['id','document_date','employee_code','new_division','new_branch','new_department'],where:{company_code:companyCode},include:[{model: divisionMoel, attributes:['gradeName']},{model: branchModel, attributes:['branch_name']},{model: departmentModel, attributes:['description']},{model: empMasterModel, attributes:['employee_name']},{model: branchModel, attributes:['branch_name']}]})
  .then(getData  =>{
    console.log("data ", getData[0].con_grade.gradeName);
    getData.map(data => console.log("dsadsa",data.con_com_branchmaster));
      all_data = getData.map(data => ({
          'employee_name':data.cor_employee_master.employee_name,
          'division': data.new_division,
          'id': data.id,
          'document_date': data.document_date,
          'branch': data.new_branch,          
          'old_branch': data.con_com_branchmaster.branch_name,
          'new_division': data.con_grade.gradeName,
          'new_branch': data.con_com_branchmaster.branch_name,
          'department': data.new_department,
          'new_department': data.con_department.description?data.con_department.description:''
      }))
      // console.log("result",all_data);
      res.json({isExecuted:true, data: all_data});
      res.end();
   });
}


// exports.getEmpReleaseList = async (req, res) => {
//   let companyCode = '200';
//   findId = req.params.id;
//   console.log("id -----" ,findId);
//   transferOrderModel.belongsTo(branchModel,{ foreignKey:'old_branch',targetKey:'branch_code'});
//   transferOrderModel.belongsTo(branchModel,{ foreignKey:'new_branch',targetKey:'branch_code'});
//   transferOrderModel.belongsTo(divisionMoel,{ foreignKey:'new_division',targetKey:'gradeCode'});
//   transferOrderModel.belongsTo(divisionMoel,{ foreignKey:'old_division',targetKey:'gradeCode'});
//   transferOrderModel.belongsTo(departmentModel,{ foreignKey:'new_department',targetKey:'dept_code'});
//   transferOrderModel.belongsTo(empMasterModel,{ foreignKey:'employee_code',targetKey:'employee_code'});
  
//   await transferOrderModel.findAll({attributes:['id','document_date','employee_code','new_division','new_branch','new_department'],where:{company_code:companyCode, id:findId},
//   include:[{model: divisionMoel, attributes:['gradeName']},{model: divisionMoel, attributes:['gradeName']},{model: branchModel, attributes:['branch_name']},{model: departmentModel, attributes:['description']},{model: empMasterModel, attributes:['employee_name']},{model: branchModel, attributes:['branch_name']}]})
//   .then(getData  =>{
//     console.log("data ", getData[0].con_grade.gradeName);
//     getData.map(data => console.log("dsadsa",data.con_com_branchmaster));
//       all_data = getData.map(data => ({
//           'employee_name':data.cor_employee_master.employee_name,
//           'new_division': data.new_division,
//           'id': data.id,
//           'document_date': data.document_date,
//           'new_branch': data.new_branch,          
//           'old_branch': data.con_com_branchmaster.branch_name,
//           'new_division': data.con_grade.gradeName,
//           'old_division': data.con_grade.gradeName,
//           'new_branch': data.con_com_branchmaster.branch_name,
//           'department': data.new_department,
//           'new_department': data.con_department.description?data.con_department.description:''
//       }))
//       console.log(all_data);
//       res.json({isExecuted:true, data: all_data});
//       res.end();
//    });
// }


exports.getEmpReleaseList = async (req, res) => {
  try{
    findId = req.params.id;
    // console.log("id -----" ,findId);
  const companyCode = '200';

  let transferData =   
     await  dbConnect.query(`Select t.id, t.new_branch, b.branch_name AS new_br, t.old_branch, ob.branch_name AS old_br, t.new_division, g.gradeName AS new_div, t.old_division, og.gradeName AS old_div,
                              t.new_department, d.description AS new_dept, t.old_department, od.description AS old_dept, t.document_date, e.employee_name, e.employee_code, t.tr_reference
                            FROM cor_transfer t, cor_employee_master e, con_com_branchmaster b, con_grades g, con_department d,
                                con_com_branchmaster ob, con_grades og, con_department od
                            Where t.company_code = '${companyCode}'
                            And t.id = '${findId}'
                            And t.company_code = e.company_code
                            And t.employee_code = e.employee_code
                            And t.company_code = b.company_code
                            And t.new_branch = b.branch_code
                            And t.company_code = g.company_code
                            And t.new_division = g.gradeCode
                            And t.company_code = d.company_code
                            And t.new_department = d.dept_code
                            And t.company_code = ob.company_code
                            And t.old_branch = ob.branch_code
                            And t.company_code = og.company_code
                            And t.old_division = og.gradeCode
                            And t.company_code = od.company_code
                            And t.old_department = od.dept_code`,
                              {type: QueryTypes.SELECT});

  console.log(transferData);
    res.json({isExecuted:true, data: transferData});
    res.end();
  } catch(err) {
      console.log(err);
  }
};


exports.getTransferReleaseList = async (req, res) => {
  try{
    // findId = req.params.id;
    // console.log("id -----" ,findId);
  const companyCode = '200';

  let releaseData =   
     await  dbConnect.query(`Select t.id, t.new_branch, b.branch_name AS new_br, t.old_branch, ob.branch_name AS old_br, t.new_division, g.gradeName AS new_div, t.old_division, og.gradeName AS old_div,
                              t.new_department, d.description AS new_dept, t.old_department, od.description AS old_dept, t.document_date, e.employee_name, e.employee_code, t.tr_reference,
                              if(t.pystatus='RAS','RAISED','APPROVED') as pystatus
                            FROM cor_transfer t, cor_employee_master e, con_com_branchmaster b, con_grades g, con_department d,
                                con_com_branchmaster ob, con_grades og, con_department od
                            Where t.company_code = '${companyCode}'
                            And t.pystatus = 'RAS'
                            And t.company_code = e.company_code
                            And t.employee_code = e.employee_code
                            And t.company_code = b.company_code
                            And t.new_branch = b.branch_code
                            And t.company_code = g.company_code
                            And t.new_division = g.gradeCode
                            And t.company_code = d.company_code
                            And t.new_department = d.dept_code
                            And t.company_code = ob.company_code
                            And t.old_branch = ob.branch_code
                            And t.company_code = og.company_code
                            And t.old_division = og.gradeCode
                            And t.company_code = od.company_code
                            And t.old_department = od.dept_code`,
                              {type: QueryTypes.SELECT});

  console.log(releaseData);
    res.json({isExecuted:true, data: releaseData});
    res.end();
  } catch(err) {
      console.log(err);
  }
};



exports.getEmpListById = async (req, res) => {
  id = req.params.id;
  console.log("id -" ,id);
  empMasterModel.belongsTo(divisionMoel,{ foreignKey:'division',targetKey:'gradeCode'});
  empMasterModel.belongsTo(branchModel,{ foreignKey:'branch',targetKey:'branch_code'});
  empMasterModel.belongsTo(departmentModel,{ foreignKey:'department',targetKey:'dept_code'});
  
  await empMasterModel.findOne({attributes:['employee_name','division','branch','department'],where:{employee_code:id},include:[{model: divisionMoel, attributes:['gradeName']},{model: branchModel, attributes:['branch_name']},{model: departmentModel, attributes:['description']}]})
  .then(getData  =>{
    console.log(getData);
      all_data ={
          'employee_name':getData.employee_name,
          'division': getData.division,
          'branch': getData.branch,
          'division_name': getData.con_grade.gradeName,
          'branch_name': getData.con_com_branchmaster.branch_name,
          'department': getData.department,
          'department_name': getData.con_department.description
      };
      // console.log("result",all_data);
      res.json({isExecuted:true, data: all_data});
      res.end();
   });
}



// exports.getTransferReleaseList = async (req, res) => {
//   transferOrderModel.findAll({where: {company_code: '200', pystatus: 'RAS'}})
//       .then(getData => {  
//           res.json({isExecuted:true, data: getData});
//           res.end();     
//       })
// };


exports.addTransferOrder = async (req, res) => {
        
    const formData = {
        id                  : req.body.id,
        company_code        : req.body.company_code, 
        employee_code       : req.body.employee_code,
        document_date       : req.body.document_date,
        effective_date      : req.body.effective_date,
        actual_eff_date     : req.body.actual_eff_date,
        release_date        : req.body.release_date,
        actual_rels_date    : req.body.actual_rels_date,
        new_branch          : req.body.new_branch,
        old_branch          : req.body.old_branch,
        new_division        : req.body.new_division,
        old_division        : req.body.old_division,
        new_department      : req.body.new_department,
        old_department      : req.body.old_department,
        pystatus            : req.body.pystatus,
        pyempacp            : req.body.pyempacp,
        release_flag        : req.body.release_flag,
        tr_reference        : req.body.tr_reference,
        insert_by           : req.body.insert_by,
        insert_date         : req.body.insert_date,
        update_by           : req.body.update_by,
        update_date         : req.body.update_date, 
    };
console.log(formData);
    transferOrderModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error-----', err);
    })
};



exports.getTransferOrderById = async (req, res) => {
  let editId = req.params.id;
  
  transferOrderModel.findOne(
      { where: {id: editId}}
    )
  .then(editData => {
    res.json({isExecuted:true, data: editData, message: "Data fetched successfully."});
    res.end();
    })
  .catch(err => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  });
};


exports.updateTransferOrder = async (req, res) => {
    let updatedId = req.params.id;

    transferOrderModel.update({
      id                  : req.body.id,
      company_code        : req.body.company_code, 
      employee_code       : req.body.employee_code,
      document_date       : req.body.document_date,
      effective_date      : req.body.effective_date,
      actual_eff_date     : req.body.actual_eff_date,
      release_date        : req.body.release_date,
      actual_rels_date    : req.body.actual_rels_date,
      new_branch          : req.body.new_branch,
      old_branch          : req.body.old_branch,
      new_division        : req.body.new_division,
      old_division        : req.body.old_division,
      new_department      : req.body.new_department,
      old_department      : req.body.old_department,
      pystatus            : req.body.pystatus,
      pyempacp            : req.body.pyempacp,
      release_flag        : req.body.release_flag,
      tr_reference        : req.body.tr_reference,
      update_by           : req.body.update_by,
      update_date         : req.body.update_date, 
  }, {where: {id: updatedId}}
    )

    .then((updated)=> {
      res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
};

exports.updateTransferRelease = async (req, res) => {
    let updatedId = req.params.id;

    transferOrderModel.update({
      id                  : req.params.id,
      company_code        : req.body.company_code, 
      employee_code       : req.body.employee_code,
      document_date       : req.body.document_date,
      effective_date      : req.body.effective_date,
      actual_eff_date     : req.body.actual_eff_date,
      release_date        : req.body.release_date,
      actual_rels_date    : req.body.actual_rels_date,
      new_branch          : req.body.new_branch,
      old_branch          : req.body.old_branch,
      new_division        : req.body.new_division,
      old_division        : req.body.old_division,
      new_department      : req.body.new_department,
      old_department      : req.body.old_department,
      pystatus            : 'APR',
      pyempacp            : req.body.pyempacp,
      release_flag        : 'Y',
      tr_reference        : req.body.tr_reference,
      update_by           : req.body.update_by,
      update_date         : req.body.update_date, 
  }, {where: {id: updatedId}}
    )

    .then((updated)=> {
      res.json({isExecuted:true, data: updated, message:"Successfully Updated Data For: " + updatedId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
};


exports.deleteTransferOrder = async (req, res) => {
    let deleteId = req.params.id;
    
    transferOrderModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Not deleted for : "+ deleteId});
        res.end();
    });
};


exports.getDeductionCode = async (req, res) => {
  earnDeductModel.findAll({
    attributes: [['soft_code', 'code'], 'description'],
    where: {hard_code: 'ER'}
  })
  .then(getData => { 
      res.json({isExecuted:true, data: getData});
      res.end();     
  })
};
