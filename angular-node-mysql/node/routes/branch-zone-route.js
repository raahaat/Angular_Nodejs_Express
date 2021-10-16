const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const branch_zone = require('../models/branch-zone');

router.post('/branchzone/add', (req, res) => {
        
    const formData = {
        id      : req.body.id,
        company_code: req.body.company_code,
        hard_code   : req.body.hard_code,
        soft_code   : req.body.soft_code,   
        description : req.body.description,
        in_short    : req.body.in_short,
        insert_by   : req.body.insert_by,
        insert_date : req.body.insert_date,
        update_by   : req.body.update_by,
        update_date : req.body.update_by,
    };

    branch_zone.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
    })
});


router.get('/branchzone/list', (req, res) => {
  branch_zone.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});


router.delete('/branchzone/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    branch_zone.destroy(
      { where: {id: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "branch zone is not deleted for : "+ deleteId});
        res.end();
      });
  });

  router.get('/branchzone/count', (req, res) => {
    branch_zone.findAndCountAll({
      where: {
        company_code: '200'
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