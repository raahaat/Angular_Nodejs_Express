const desigModel = require('../models/designation-setup-model');
const desigWiseTax = require('../models/con-desig-wise-tax-setup');
const Sequelize = require ('sequelize');
const {QueryTypes} = require ('sequelize');
const dbConnect = require('../database/db')


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


exports.addDesigTax = async (req, res) => {
  let currentUser = req.body.insert_by
  try {
    const objKeys = Object.keys(req.body.obj);
    for (let i = 0; i < objKeys.length; i++) {
       const formData = {     
            company_code: req.body.obj[objKeys[i]].company_code,
            effective_date:req.body.obj[objKeys[i]].effectFrom,
            expire_date  : req.body.obj[objKeys[i]].effectTo ,
            designation  : req.body.obj[objKeys[i]].designationCode ,   
            desired_type : req.body.obj[objKeys[i]].desired_type, 
            desired_type_code: 'DR002',    
            random_desig_type : 'M' ,     
            active_flag : '' ,     
            fixed_amount : req.body.obj[objKeys[i]].fixedAmount ,  
            desired_percent : req.body.obj[objKeys[i]].percent ,  
            insert_by    : currentUser,  
            insert_date  : new Date(), 
        };
      await desigWiseTax.create(formData)
          .catch((err)=> {
            res.json({isExecuted: false, message : 'Error to insert tax data.'});
            res.end();
            console.log(err);
          })
    }
    res.json({isExecuted: true, message : 'Successfully inserted.'});
    res.end();
   } catch (err) {
     res.json({ isExecuted: false, message: "Unknown Error: " + err });
     res.end();
   }
};


exports.getTaxInfoById = async (req, res) => {
  try {
    let companyCode = '200';
    let id = req.params.id;

    let getData = 
     await dbConnect.query(`SELECT c.id, b.designationName AS designation_name, 
                                   c.effective_date, c.expire_date, c.desired_type, c.fixed_amount, c.desired_percent
                              FROM con_desig_wise_tax_setup c, con_designations b
                             WHERE c.company_code = '${companyCode}' 
                               AND c.id = ${id}
                               AND c.company_code = b.company_code
                               AND c.designation = b.designationCode
                             ORDER BY c.effective_date, b.designationRank`
                            , {type: QueryTypes.SELECT, plain: true})
     return res.json(getData)
  } catch (error) {
    console.log(error);
  }  
}; 

exports.getDesignationWiseTax = async (req, res) => {
  try {
    let companyCode = '200';
    let getData = 
     await dbConnect.query(`SELECT c.id, b.designationName AS designation, c.effective_date, c.expire_date, 
                                  (CASE WHEN c.desired_type='PERCENT' THEN CONCAT(c.desired_percent,'%') 
                                        ELSE CONCAT(c.fixed_amount,' BDT') END) desired_amount_per
                             FROM con_desig_wise_tax_setup c, con_designations b
                            WHERE c.company_code = '${companyCode}' 
                              AND c.company_code = b.company_code
                              AND c.designation = b.designationCode
                              ORDER BY c.effective_date, b.designationRank`
                            ,{type: QueryTypes.SELECT})
     return res.json(getData)
  } catch (error) {
    console.log(error);
  }  
}


exports.deleteDesignationTax = async (req, res) => {
  try {
    let deleteId = req.params.id;
    
    desigWiseTax.destroy(
      { where: {id: deleteId}}
    )
    return  res.json({isExecuted:true, message: 'Data deleted successfully!'});
  } catch (error) {
    return res.json({isExecuted:false, message: "Error to delete data!"});
  }
};

exports.updateDesignationTax = async (req, res) => {
  try {
    let updatedId = req.params.id;
    desigWiseTax.update(req.body, 
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