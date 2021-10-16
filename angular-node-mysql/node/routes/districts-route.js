const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const districts = require('../models/districts');

router.post('/districts/add', (req, res) => {
        
    const formData = {
        id:       req.body.id,
        pycomcde: req.body.pycomcde,
        pyhdrcde: req.body.pyhdrcde,
        pysofcde: req.body.pysofcde,   
        pycoddes: req.body.pycoddes,
        pyostamp: req.body.pyostamp,
        pytstamp: req.body.pytstamp
    };

    districts.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
});


router.get('/districts/list', (req, res) => {
    districts.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


router.delete('/districts/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    districts.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Exam Result is not deleted for : "+ deleteId});
        res.end();
      });
  });



module.exports = router