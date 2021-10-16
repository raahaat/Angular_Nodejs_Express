 const customerTable = require('../models/customer_table')
exports.addCustomer = async (req, res) => {
        customerTable.create(req.body)
        .then(() => {
            return res.body('Data inserted!')

        })
        .catch(() => {
            return res.body('Connection error!')

        })
  


    console.log(req.body)
    return res.json('Signed up successfully!')
};

exports.getCustomers = async(req, res) => {
    customerTable.findAll(  )
    .then(getData => {
        res.json({isExecuted : true , data: getData, msg: "Data fatched successfully!"});
        res.end;
        
    })
};

// exports.deleteCustomer = async (req, res) => {
//     customerTable.destroy(
//         {where:{id: deleteId}}
//     )
    

//     }


exports.deleteCustomer = async (req, res) => {
    let deleteId = req.params.id;
    
    customerTable.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Company List is not deleted for : "+ deleteId});
        res.end();
    });
  };

  exports.getCustomerById = async (req, res) => {
    let editId = req.params.id;
    
    customerTable.findOne(
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
  
  exports.updateCustomer = async (req, res) => {
    let updatedId = req.params.id;
  
console.log(req.body)
console.log(req.params.id)

    customerTable.update({
  
      c_name         : req.body.c_name,
      c_phone          : req.body.c_phone,
      c_email        : req.body.c_email,
      c_password    : req.body.c_password,
      c_address     : req.body.c_address
      
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
  