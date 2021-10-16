const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const resultdivision = require('../models/resultdivision');



router.post('/resultdivision/add', (req, res) => {        
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

    resultdivision.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/resultdivision/list', (req, res) => {
  resultdivision.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/resultdivision/list/:id', (req, res) => {
  let searchId = req.params.id;

  resultdivision.findAll(
    { where: {SOFCDE: searchId,
              HRDCDE: 'CD'
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/resultdivision/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    resultdivision.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Result Division is not deleted for : "+ deleteId});
        res.end();
      });
});


module.exports = router