const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

// const address_type = require('../models/districts');
const upazilla = require('../models/upazilla');



router.post('/upazilla/add', (req, res) => {
        
    const formData = {
        id: req.body.id,
        pycomcde: req.body.pycomcde,
        pyhdrcde: req.body.pyhdrcde,
        pysofcde: req.body.pysofcde,   
        pycoddes: req.body.pycoddes,
        pyostamp: req.body.pyostamp,
        pytstamp: req.body.pytstamp
    };

    upazilla.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
});


router.get('/upazilla/list', (req, res) => {
    upazilla.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


router.delete('/upazilla/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    upazilla.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Upazilla is not deleted for : "+ deleteId});
        res.end();
      });
  });



module.exports = router