const leaveAuthModel = require('../models/leave-authorize-setup');
const { Op } = require("sequelize");

exports.getLeaveAuthorizedList = async (req, res) => {
    leaveAuthModel.findAll()
    .then(getData => { 
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
};


exports.deleteLeaveAuth = async (req, res) => {
    let deleteId = req.params.id;
    leaveAuthModel.destroy(
        { where: {id: deleteId}}
      )
      .then( () => {
            res.json({isExecuted:true, message: "Data deleted successfully."});
            res.end();
          })
        .catch(err => {
          res.json({isExecuted:false, message: "Data is not deleted."});
          res.end();
        });
};


exports.editLeaveAuth = async (req, res) => {
  let editId = req.params.id;
  leaveAuthModel.findOne(
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


exports.updateLeaveAuth = async (req, res) => {
    let updatedId = req.params.id;
    leaveAuthModel.findOne({
     where: {
      id: { [Op.ne]: updatedId },
      company_code: req.body.company_code,
      employee_group: req.body.employee_group,
      leave_type: req.body.leave_type,
     }
     })
     .then(data => {
       if (!data) {
        leaveAuthModel.update(
          { company_code: req.body.company_code,
            employee_group: req.body.employee_group,
            leave_type: req.body.leave_type,
            doc_number: req.body.doc_number, 
            branch_office: req.body.branch_office,
            apply_leave_type: req.body.apply_leave_type, 
            effective_date: req.body.effective_date, 
            expire_date: req.body.expire_date, 
            lfa_flag: req.body.lfa_flag, 
            reschedule_flag: req.body.reschedule_flag, 
            no_of_days: req.body.no_of_days, 
            no_of_approval: req.body.no_of_approval,
            update_by: req.body.update_by, 
            update_date: req.body.update_date },
            {where: {id: updatedId}}
          )
          .then(()=> {
            res.json({isExecuted:true, message:"Successfully Updated Data."});
            res.end();
          })
          .catch (err => {
            res.json({isExecuted:false, message:"Unknown Error: "+ err});
            res.end();
          })
       } else {
         res.json({isExecuted:false, message:"Data already exists in table."});
         res.end();
       }
     })
   };
   

exports.addLeaveAuth = async (req, res) => {
  const leaveAuthData = {
    company_code: req.body.company_code,
    employee_group: req.body.employee_group,
    leave_type: req.body.leave_type,
    doc_number: req.body.doc_number, 
    branch_office: req.body.branch_office,
    apply_leave_type: req.body.apply_leave_type, 
    effective_date: req.body.effective_date, 
    expire_date: req.body.expire_date, 
    lfa_flag: req.body.lfa_flag, 
    reschedule_flag: req.body.reschedule_flag, 
    no_of_days: req.body.no_of_days, 
    no_of_approval: req.body.no_of_approval,
    insert_by: req.body.insert_by,      
    insert_date: req.body.insert_date
  };

  leaveAuthModel.findOne({
    where: {
      company_code: req.body.company_code,
      employee_group: req.body.employee_group,
      leave_type: req.body.leave_type,
    }
    })
    .then(data => {
      if (!data) {
        leaveAuthModel.create(leaveAuthData)
          .then(() => {
            res.status(201).json({isExecuted:true, message:"Successfully data added."});
            res.end();
          })
          .catch(err => {
            res.json({isExecuted:false, message:"Error to save data."});
            res.end();
          }) 
      } else {
        res.json({isExecuted:false, message:"Data already exists in table."});
        res.end();
      }
    })
    .catch(err => {
      res.json({isExecuted:false, message:"Error to save data!!!"});
      res.end();
    })
};