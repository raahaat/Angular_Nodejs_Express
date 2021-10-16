const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const Pycodmas = require('../models/pycodmas')



router.post('/pycodmas', (req, res) => {
        
    const formData = {
        code_id: req.body.code_id,
        pyhdrcde: req.body.pyhdrcde,
        pysofcde: req.body.pysofcde,   
        pycoddes: req.body.pycoddes,
        pyheader: req.body.pyheader
    };

    Pycodmas.create(formData)
    .then((emp)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
});


router.get('/pycodmas/list', (req, res) => {
    Pycodmas.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


module.exports = router