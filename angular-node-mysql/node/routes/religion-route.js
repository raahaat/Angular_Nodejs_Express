const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const religion = require('../models/religion');



router.post('/religion/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        COMPCDE: req.body.COMPCDE,
        HRDCDE: req.body.HRDCDE,
        SOFCDE: req.body.SOFCDE,   
        CODDES: req.body.CODDES,
        CREATEBY: req.body.CREATEBY,
        CREATEDT: req.body.CREATEDT,
        UPDATEBY: req.body.UPDATEBY,
        UPDATEDT: req.body.UPDATEDT
    };

    religion.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/religion/list', (req, res) => {
  religion.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/religion/list/:id', (req, res) => {
  let searchId = req.params.id;

  religion.findAll(
    { where: {SOFCDE: searchId,
              HRDCDE: 'RG'
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/religion/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    religion.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Religion is not deleted for : "+ deleteId});
        res.end();
      });
});


module.exports = router