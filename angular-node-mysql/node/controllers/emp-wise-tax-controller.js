const addressTypeModel = require('../models/con-address-type');
const empmasModel = require('../models/cor-employee-master');
const desigModel = require('../models/designation-setup-model');
const empWiseTaxModel = require('../models/emp-wise-tax-setup');
const dbConnect = require('../database/db');
const Sequelize = require ('sequelize');
const {QueryTypes} = require ('sequelize');


exports.saveEmployeeWiseTax = async (req, res) => {
  try {
    console.log(req.body);
    await empWiseTaxModel.bulkCreate(req.body);
    return res.json({isExecuted: true, message: 'Successfully Inserted!'});
  } catch (error) {
    console.log(error);
    return res.json({isExecuted: false, message: 'Error to insert data!'})
  }  
}

exports.getEmployeeList = async (req, res) => {
  let companyCode = '200';
  let empId = req.params.id;
  let branchId = req.params.branch;
  let desigId = req.params.desig;

  let getData = 
   await dbConnect.query(`SELECT a.id, employee_code, employee_name, designation, b.designationName AS designationName 
                            FROM cor_employee_master a, con_designations b
                           WHERE a.company_code = '200' 
                             AND a.designation = b.designationCode
                             AND a.employee_code = (CASE WHEN 'All' = '${empId}' THEN a.employee_code ELSE '${empId}' END) 
                             AND a.designation = (CASE WHEN 'All' = '${desigId}' THEN a.designation ELSE '${desigId}' END) 
                             AND a.branch = (CASE WHEN 'All' = '${branchId}' THEN a.branch ELSE '${branchId}' END)
                           ORDER BY a.employee_code ASC`, {type: QueryTypes.SELECT})
   return res.json({isExecuted:true, data: getData})
};  

exports.getDesignationByParam = async (req, res) => {
  let companyCode = '200';
  let desigId = req.params.id;

  desigModel.findAll({
    where: { 
      company_code: companyCode,
      designationCode: desigId,
    },
    order: [
      ['designationRank', 'ASC']
    ]
  })
  .then(getData => {  
    res.json({isExecuted:true, data: getData});
    res.end();     
  })
};  


exports.getAddressTypeList = async (req, res) => {
    addressTypeModel.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
};


exports.addAddressType = async (req, res) => {
        
    const formData = {
        id          : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,
        description : req.body.description,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date 
    };

    addressTypeModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};



exports.getAddressTypeById = async (req, res) => {
  let editId = req.params.id;
  
  addressTypeModel.findOne(
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


exports.updateAddressType = async (req, res) => {
    let updatedId = req.params.id;

    addressTypeModel.update({
      // id          : req.body.id,
      // company_code: req.body.company_code,
      // hard_code   : req.body.hard_code,
      soft_code   : req.body.soft_code,
      description : req.body.description,
      update_by   : req.body.update_by,
      update_date : req.body.update_date 
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


exports.deleteAddressType = async (req, res) => {
    let deleteId = req.params.id;
    
    addressTypeModel.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Exam Result is not deleted for : "+ deleteId});
        res.end();
    })
};


exports.getTaxInfoById = async (req, res) => {
  try {
    let companyCode = '200';
    let id = req.params.id;

    let getData = 
     await dbConnect.query(`SELECT c.id, c.employee_code, a.employee_name, b.designationName AS designation_name, 
                                   c.effective_date, c.expire_date, c.desired_type, c.desired_amount, c.desired_percent
                              FROM cor_employee_master a,  con_emp_wise_tax_setup c, con_designations b
                             WHERE a.company_code = '${companyCode}'
                               AND c.id = ${id} 
                               AND a.company_code = c.company_code
                               AND a.employee_code = c.employee_code
                               AND a.designation = b.designationCode`
                            , {type: QueryTypes.SELECT, plain: true})
     return res.json(getData)
  } catch (error) {
    console.log(error);
  }  
}; 

exports.getEmployeeWiseTax = async (req, res) => {
  try {
    let companyCode = '200';

    let getData = 
     await dbConnect.query(`SELECT c.id, c.employee_code, a.employee_name, b.designationName AS designation, 
                                   c.effective_date, c.expire_date, 
                                   (CASE WHEN c.desired_type='PERCENT' THEN CONCAT(c.desired_percent,'%') 
                                        ELSE CONCAT(c.desired_amount,' BDT') END) desired_amount_per
                              FROM cor_employee_master a,  con_emp_wise_tax_setup c, con_designations b
                             WHERE a.company_code = '${companyCode}' 
                               AND a.company_code = c.company_code
                               AND a.employee_code = c.employee_code
                               AND a.designation = b.designationCode
                            ORDER BY c.effective_date, b.designationRank, a.employee_code ASC`
                            ,{type: QueryTypes.SELECT})
     return res.json(getData)
  } catch (error) {
    console.log(error);
  }  
};  


exports.updatEmployeeTax = async (req, res) => {
  try {
    let updatedId = req.params.id;
    empWiseTaxModel.update(req.body, 
      {where: {
        id: updatedId
       }
      }
    ).catch(error=> {
      console.log('Tax update error: ', error);
      return res.json({isExecuted:false, message: error});
    })
    return res.json({isExecuted:true, message:"Data Successfully Updated!"});
  } catch (error) {
    console.log('Tax update error: ', error);
    return res.json({isExecuted:false, message: error});
  }
};

exports.deleteEmployeeTax = async (req, res) => {
  try {
    let deleteId = req.params.id;
    
    empWiseTaxModel.destroy(
      { where: {id: deleteId}}
    )
    return  res.json({isExecuted:true, message: 'Data deleted successfully!'});
  } catch (error) {
    return res.json({isExecuted:false, message: "Error to delete data!"});
  }
};
