const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const empStatus = require('../models/empstatus');



router.post('/empstatus/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        COMPCDE: req.body.COMPCDE,
        HRDCDE: req.body.HRDCDE,
        SOFCDE: req.body.SOFCDE,   
        CODDES: req.body.CODDES,
        DOPPRO: req.body.DOPPRO,
        CREATEBY: req.body.CREATEBY,
        CREATEDT: req.body.CREATEDT,
        UPDATEBY: req.body.UPDATEBY,
        UPDATEDT: req.body.UPDATEDT
    };

    empStatus.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/empstatus/list', (req, res) => {
  empStatus.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/empstatus/list/:id', (req, res) => {
  let searchId = req.params.id;

  empStatus.findAll(
    { where: {SOFCDE: searchId,
              HRDCDE: 'ST'
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/empstatus/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    empStatus.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Employee status is not deleted for : "+ deleteId});
        res.end();
      });
});

router.get('/empstatus/count', (req, res) => {
  empStatus.findAndCountAll({
    where: {
      compcde: '200'
    }
  })
  .then(countData => {
        res.json({countData});
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Counting Problem..."});
      res.end();
  })
});

module.exports = router