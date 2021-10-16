const desiredModel = require('../models/desired-loan-advance');


exports.getDesiredLoanAdvance = (req, res) => {
  desiredModel.findAll({
    order: [
      ['effectiveDate', 'DESC'],
    ],
  }).then((getData) => {
    res.json({isExecuted:true, data: getData});
    res.end();  
  }).catch((err) => {
    res.json({isExecuted:false, message: "Error to get data."});
    res.end();
  })
}


exports.addDesiredLoanAdvance = async (req, res) => {
 let compCode = '200';
 try {
    const objKeys = Object.keys(req.body.obj);
    for (let i = 0; i < objKeys.length; i++) {
      let dataExists = 
      await desiredModel.findAll({
                    where: {
                      company_code: req.body.obj[objKeys[i]].company_code,
                      effectiveDate: req.body.obj[objKeys[i]].effectiveDate,
                      salaryHead: req.body.obj[objKeys[i]].salaryHead,
                      status: req.body.obj[objKeys[i]].status
                    }
                    });

      if (dataExists.length === 0) {                 
        const formData = {     
              company_code        : req.body.obj[objKeys[i]].company_code ,
              effectiveDate       : req.body.obj[objKeys[i]].effectiveDate,
              expiryDate          : req.body.obj[objKeys[i]].expiryDate,
              designationCode     : req.body.obj[objKeys[i]].designationCode,     
              salaryHead          : req.body.obj[objKeys[i]].salaryHead,     
              desiredPercent      : req.body.obj[objKeys[i]].desiredPercent,     
              desiredFixedAmount  : req.body.obj[objKeys[i]].desiredFixedAmount,     
              extraDesiredPercent : req.body.obj[objKeys[i]].extraDesiredPercent,     
              status              : req.body.obj[objKeys[i]].status,         
              insert_by           : req.body.obj[objKeys[i]].insert_by ,  
              insert_date         : req.body.obj[objKeys[i]].insert_date 
          };
        await desiredModel.create(formData);
      } else if (dataExists.length > 0){
       return res.json({isExecuted:false, message:"Duplicate data found in table."});
      }
    }
    return res.json({isExecuted:true, message:"Successfully inserted!"});
  } catch (err) {
   return res.json({ isExecuted: false, message: "Unknown Error: " + err });
  }
};
