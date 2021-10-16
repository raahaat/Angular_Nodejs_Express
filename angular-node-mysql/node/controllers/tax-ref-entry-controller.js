const taxReferenceModel = require('../models/tax-ref-num-entry');
const dbConnect = require('../database/db');
const Sequelize = require ('sequelize');
const {QueryTypes} = require ('sequelize');


exports.saveTaxReferenceEntry = async (req, res) => {
  try {
    await taxReferenceModel.create(req.body);
    return res.json({isExecuted: true, message: 'Successfully Inserted!'});
  } catch (error) {
    console.log(error);
    return res.json({isExecuted: false, message: 'Error to insert data!'})
  }  
}

exports.getTaxRefInfo = async (req, res) => {
  try {
    let companyCode = '200';
    let getData = 
     await dbConnect.query(`SELECT c.id, c.employee_code, a.employee_name, b.designationName AS designation, 
                                   c.year_from, c.year_to, c.date_from, c.date_to, c.ref_number, c.document_date,
                                   (Select headName From con_earn_head Where a.company_code = c.company_code
                                       And headCode = c.tax_code) tax_head
                              FROM cor_employee_master a,  con_designations b, tax_ref_number_entry c 
                             WHERE a.company_code = '${companyCode}' 
                               AND a.company_code = c.company_code
                               AND a.employee_code = c.employee_code
                               AND a.designation = b.designationCode
                             ORDER BY c.year_from, b.designationRank, a.employee_code ASC`
                            ,{type: QueryTypes.SELECT})
     return res.json(getData)
  } catch (error) {
    console.log(error);
    return res.json(null)
  }  
}; 

exports.deleteTaxRef = async (req, res) => {
  try {
    let deleteId = req.params.id;
    
    taxReferenceModel.destroy(
      { where: {id: deleteId}}
    )
    return  res.json({isExecuted:true, message: 'Data deleted successfully!'});
  } catch (error) {
    return res.json({isExecuted:false, message: "Error to delete data!"});
  }
};

exports.getTaxInfoById = async (req, res) => {
  try {
    let companyCode = '200';
    let id = req.params.id;
    let getData = 
     await dbConnect.query(`SELECT c.id, c.employee_code, a.employee_name, b.designationName AS designation, 
                                   c.year_from, c.year_to, c.date_from, c.date_to, c.ref_number, c.document_date,
                                   c.tax_code
                              FROM cor_employee_master a,  con_designations b, tax_ref_number_entry c 
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


exports.updateTaxRefEntry = async (req, res) => {
  try {
    let updatedId = req.params.id;
    taxReferenceModel.update(req.body, 
      {where: {
        id: updatedId
       }
      }
    ).catch(error=> {
      console.log('Tax Ref Entry update error: ', error);
      return res.json({isExecuted:false, message: error});
    })
    return res.json({isExecuted:true, message:"Data Successfully Updated!"});
  } catch (error) {
    console.log('Tax update error: ', error);
    return res.json({isExecuted:false, message: error});
  }
};

exports.duplicateYearCheck = async (req, res) => {
  try {
    let companyCode = '200';
    let checkYear = req.params.year;
    let yearCount =
    taxReferenceModel.findAll({
      where: { 
        company_code: companyCode,
        year_from: checkYear
      }
    })
    return res.json(yearCount) 
  } catch (error) {
    console.log(error);
  }
  
}; 

 




 



