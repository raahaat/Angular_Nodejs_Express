const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_com_yr_holiday = require('../models/con-com-yr-holiday');



router.post('/concomyrholiday/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        holiday_date: req.body.	holiday_date,   
        description: req.body.description,
        sort_description: req.body.sort_description,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };

    con_com_yr_holiday.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concomyrholiday/list', (req, res) => {
  con_com_yr_holiday.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concomyrholiday/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_com_yr_holiday.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concomyrholiday/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_com_yr_holiday.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Holiday is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concomyrholiday/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_com_yr_holiday.update(
    {	holiday_date: req.body.	holiday_date,   
      description: req.body.description,
      sort_description: req.body.sort_description,
      update_by: req.body.update_by,
      update_date: req.body.update_date},
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