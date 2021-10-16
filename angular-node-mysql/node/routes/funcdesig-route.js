const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const funcdesig = require('../models/funcdesig');



router.post('/funcdesig/add', (req, res) => {        
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

    funcdesig.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/funcdesig/list', (req, res) => {
  funcdesig.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/funcdesig/list/:id', (req, res) => {
  let searchId = req.params.id;

  funcdesig.findAll(
    { where: {SOFCDE: searchId,
              HRDCDE: 'FD'
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/funcdesig/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    funcdesig.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Functional Designation is not deleted for : "+ deleteId});
        res.end();
      });
});


module.exports = router