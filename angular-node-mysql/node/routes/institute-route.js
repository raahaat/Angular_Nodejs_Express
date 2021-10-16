const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());


const institute = require('../models/institute');

router.post('/institute/add', (req, res) => {
        
    const formData = {
        id      : req.body.id,
        pycomcde: req.body.pycomcde,
        pyhdrcde: req.body.pyhdrcde,
        pysofcde: req.body.pysofcde,   
        pycoddes: req.body.pycoddes,
        pyostamp: req.body.pyostamp,
        pytstamp: req.body.pytstamp
    };

    institute.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
});


router.get('/institute/list', (req, res) => {
  institute.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


router.delete('/institute/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    institute.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "institute is not deleted for : "+ deleteId});
        res.end();
      });
  });



module.exports = router