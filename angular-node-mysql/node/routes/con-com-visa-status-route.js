const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_com_visa_status = require('../models/con-com-visa-status');



router.post('/concomvisastatus/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        hard_code: req.body.hard_code,
        soft_code: req.body.soft_code,   
        description: req.body.description,
        sort_description: req.body.sort_description,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };

    con_com_visa_status.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concomvisastatus/list', (req, res) => {
  con_com_visa_status.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concomvisastatus/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_com_visa_status.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concomvisastatus/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_com_visa_status.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Visa Status is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concomvisastatus/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_com_visa_status.update(
    {soft_code: req.body.soft_code,   
      description: req.body.description,
      sort_description: req.body.sort_description,
      update_by: req.body.update_by,
      update_date: req.body.update_date
    },
    {where: {IDNO: updatedId}}
  )
  .then(updateData => {
    res.json({message : 'Successfully Updated.'});
    res.end();
  })
  .catch(err => {
    res.json({isExecuted:false, message: "Visa Status is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router