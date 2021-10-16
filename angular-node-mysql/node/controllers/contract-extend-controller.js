const contractModel = require('../models/cor-contractual-extend');
const empModel = require('../models/cor-employee-master');

exports.addContractExtend = async (req, res) => {
 let compCode = '200';
 try {
    const objKeys = Object.keys(req.body.obj);
    for (let i = 0; i < objKeys.length; i++) {
       const formData = {     
            company_code    : req.body.obj[objKeys[i]].company_code ,
            employee_code   : req.body.obj[objKeys[i]].employee_code,
            old_start_date  : req.body.obj[objKeys[i]].contract_start,
            old_expire_date : req.body.obj[objKeys[i]].contract_expired,     
            new_expire_date : req.body.obj[objKeys[i]].new_expire_date,     
            insert_by       : req.body.obj[objKeys[i]].insert_by ,  
            insert_date     : req.body.obj[objKeys[i]].insert_date 
        };
      await contractModel.create(formData);
      await empModel.update(
         {contract_expired  : req.body.obj[objKeys[i]].new_expire_date,
          update_by         : req.body.obj[objKeys[i]].insert_by,
          update_date       : req.body.obj[objKeys[i]].insert_date},
           {where: {
             company_code : compCode, 
             employee_code: req.body.obj[objKeys[i]].employee_code}
           }
         ).catch (err => {
            console.log(err);
         })
    }
    res.json({isExecuted:true, message:"Successfully inserted!"});
    res.end();
  } catch (err) {
    res.json({ isExecuted: false, message: "Unknown Error: " + err });
    res.end();
  }
};
