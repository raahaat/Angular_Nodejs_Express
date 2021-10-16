const custModel = require('../models/aacustomer');

exports.addCustomer = async (req, res) => {
        
    const formData = {
        // id          : req.body.id,
        cust_id     : req.body.cust_id,
        cust_name   : req.body.cust_name,
        cust_add    : req.body.cust_address
    };

    custModel.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
};