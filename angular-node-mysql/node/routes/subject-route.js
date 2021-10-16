const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

// const address_type = require('../models/districts');
const subject = require('../models/subject');



router.post('/subject/add', (req, res) => {
        
    const formData = {
        id      : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,   
        description : req.body.description,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date,
        update_by   : req.body.update_by,
        update_date : req.body.update_by,
    };

    subject.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
});


router.get('/subject/list', (req, res) => {
  subject.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


router.delete('/subject/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    subject.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "subject is not deleted for : "+ deleteId});
        res.end();
      });
  });



module.exports = router