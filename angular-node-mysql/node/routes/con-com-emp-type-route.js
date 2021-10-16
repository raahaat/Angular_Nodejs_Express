const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_com_emp_type = require('../models/con-com-emp-type');



router.post('/concomemptype/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        COMPCDE: req.body.COMPCDE,
        HRDCDE: req.body.HRDCDE,
        SOFCDE: req.body.SOFCDE,   
        CODDES: req.body.CODDES,
        SORTDES: req.body.SORTDES,
        CREATEBY: req.body.CREATEBY,
        CREATEDT: req.body.CREATEDT,
        UPDATEBY: req.body.UPDATEBY,
        UPDATEDT: req.body.UPDATEDT
    };

    con_com_emp_type.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concomemptype/list', (req, res) => {
  con_com_emp_type.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concomemptype/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_com_emp_type.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concomemptype/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_com_emp_type.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Employee Type is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concomemptype/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_com_emp_type.update(
    {SOFCDE: req.body.SOFCDE,   
      CODDES: req.body.CODDES,
      SORTDES: req.body.SORTDES},
    {where: {IDNO: updatedId}}
  )
  .then(updateData => {
    res.json({message : 'Successfully Updated.'});
    res.end();
  })
  .catch(err => {
    res.json({isExecuted:false, message: "Employee Type is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router