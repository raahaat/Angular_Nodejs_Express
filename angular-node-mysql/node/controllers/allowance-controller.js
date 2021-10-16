 const allowanceMasterTable = require('../models/allowance-master')
 const allowanceTypeTable = require('../models/allowance-type')
 const dbConnect = require('../database/db');

exports.postAllowanceType = async (req, res) => {
        allowanceTypeTable.create(req.body)
        .then(() => {
            return res.body('Data inserted!')

        })
        .catch(() => {
            return res.body('Connection error!')

        })
  


    console.log(req.body)
    return res.json('Data inserted successfully!')
};
exports.getAllowanceMaster = async(req, res) => {
    allowanceMasterTable.findAll( {
      attributes: ['allowance_code', 'allowance_name']
    } )
    .then(getData => {
        res.json({isExecuted : true , data: getData, msg: "Data fatched successfully!"});
        res.end;
        console.log('test')
    })
};
exports.getAllowanceType = async(req, res) => {
    allowanceTypeTable.findAll()
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


exports.deleteAllowanceType = async (req, res) => {
    let deleteId = req.params.id;
    allowanceTypeTable.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Data is not deleted for : "+ deleteId});
        res.end();
    });
    
  };

  exports.getAllowanceTypeById = async (req, res) => {
    let editId = req.params.id;
    
    allowanceTypeTable.findOne(
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
  
  exports.updateAllowanceType = async (req, res) => {
    let updatedId = req.params.id;
  
console.log(req.body)
console.log(req.params.id)

    allowanceTypeTable.update({
      // id               : req.body.id,
      allowance_code   : req.body.allowance_code,
      type_name        : req.body.type_name,
      multi_time       : req.body.multi_time,
      update_by        : req.body.update_by,
      update_date      : req.body.update_date     
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
  


  // exports.getMaxTypeCode = async (req, res) => {

  //   try {
  //     let district = 
  //     await dbConnect.query(
  //       `SELECT
  //       type_code
  //   FROM
  //       allowance_allowance_type`,
  //       { type: QueryTypes.SELECT }
  //     );
  
  //     res.json({isExecuted: true, data: district});
  //     res.end(); 
  
  //   } catch {
  //     res.json({isExecuted: false, message: 'Error when fetching employee address..'});
  //     res.end(); 
  //   }
  //   console.log(res.json.data)
  // };

  exports.getMaxTypeCode = async(req, res) => {
    allowanceTypeTable.findAll( {
      attributes: ['type_code']
    } )
    .then(getData => {
        res.json({isExecuted : true , data: getData, msg: "Data fatched successfully!"});
        res.end;
        console.log('test')
    })
    console.log(res.json.getData)
};
