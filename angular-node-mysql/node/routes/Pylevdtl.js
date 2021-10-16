const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const Op = sequelize.Op;
var showerrorsucess = require('../showerrorsucess');
router.use(cors());

const Pylevdtl = require('../models/Pylevdtl');
const Pycodmas = require('../models/Pycodmas');

process.env.SECRET_KEY = 'secret';

router.get('/pylevdtl/code/:hardcode', (req, res) => {

 let hCode = req.params.hardcode;

  Pycodmas.findAll(
   { where: {hardcode: hCode}}
  )
    .then(code => {
      if (code) {
        res.json({isExecuted:true, data: code, message:"Code fetched successfully."});
        res.end();
      } else {
        res.json({isExecuted:false, message:"Code does not exist!!!"});
        res.end();
      }
    })
    .catch(err => {
      res.json({isExecuted:false, message: err});
      res.end();
    });

})

router.get('/pylevdtl/leavereport', (req, res) => {
   Pylevdtl.findAll()
     .then(leaveData => {
       if (leaveData) {
         res.json({isExecuted:true, data: leaveData, message:"Leave Data fetched successfully."});
         res.end();
       } else {
         res.json({isExecuted:false, message:"Data does not exist!!!"});
         res.end();
       }
     })
     .catch(err => {
       res.json({isExecuted:false, message: err});
       res.end();
     });
 });

 router.get('/pylevdtl/leaveinfo/:id', (req, res) => {
  let leaveId = req.params.id;
  Pylevdtl.findAll(
    { where: {id: leaveId}}
  )
   .then(leaveData => {
      if (leaveData) {
        res.json({isExecuted:true, data: leaveData, message: "Info of ID: "+ leaveId + " fetched successfully."});
        res.end();
      } else {
        res.json({isExecuted:false, message:"Leave Info does not exist!!!"});
        res.end();
      }
    })
    .catch(err => {
      res.json({isExecuted:false, message:err});
        res.end();
    });
});

router.delete('/pylevdtl/leavereport/delete/:id', (req, res) => {
  let deleteId = req.params.id;
  
  Pylevdtl.destroy(
    { where: {id: deleteId}}
  )
  .then(deletedData => {
        res.json({isExecuted:true, data: deletedData, message: "Leave details of: "+ deleteId + " is deleted successfully."});
        res.end();
      })
    .catch(err => {
      res.json({isExecuted:false, message: "Leave is not deleted for : "+ deleteId});
      res.end();
    });
});

router.put('/pylevdtl/leavereport/update/:id', (req, res) => {
    let appDate =  req.body.pyappdte;
    let updatedId = req.params.id;
    Pylevdtl.update(
      {pycomcde: req.body.pycomcde,
      pyempcde: req.body.pyempcde,
      pylevcde: req.body.pylevcde,
      pylevtyp: req.body.pylevtyp,
      pyappdte: req.body.pyappdte,
      pyfrmdte: req.body.pyfrmdte,
      pyenddte: req.body.pyenddte,
      pypurpos: req.body.pypurpos,
      pylevsts: req.body.pylevsts,
      pyrep001: req.body.pyrep001,
      pyrepflg: req.body.pyrepflg,
      pyrep002: req.body.pyrep002,
      pysubhed: req.body.pysubhed,
      pysubflg: req.body.pysubflg,
      pysubdte: req.body.pysubdte,
      pydephed: req.body.pydephed,
      pydepflg: req.body.pydepflg,
      pydepdte: req.body.pydepdte,
      pyfrnflg: req.body.pyfrnflg,
      pyostamp: req.body.pyostamp,
      pytstamp: req.body.pytstamp},

      {where: {id: updatedId}}
    )
    .then((success)=> {
      res.json({isExecuted:true, data: success, message:"Successfully Updated Data For: " + updatedId});
      res.end();
    })
    .catch (err => {
      res.json({isExecuted:false, message:"Unknown Error: "+ err});
      res.end();
    })
  });


  
router.post('/pylevdtl/apply', (req, res) => {
    const leaveData = {
      pycomcde: req.body.pycomcde,
      pyempcde: req.body.pyempcde,
      pylevcde: req.body.pylevcde,
      pylevtyp: req.body.pylevtyp,
      pyappdte: req.body.pyappdte,
      pyfrmdte: req.body.pyfrmdte,
      pyenddte: req.body.pyenddte,
      pypurpos: req.body.pypurpos,
      pylevsts: req.body.pylevsts,
      pyrep001: req.body.pyrep001,
      pyrepflg: req.body.pyrepflg,
      pyrep002: req.body.pyrep002,
      pysubhed: req.body.pysubhed,
      pysubflg: req.body.pysubflg,
      pysubdte: req.body.pysubdte,
      pydephed: req.body.pydephed,
      pydepflg: req.body.pydepflg,
      pydepdte: req.body.pydepdte,
      pyfrnflg: req.body.pyfrnflg,
      pyostamp: req.body.pyostamp,
      pytstamp: req.body.pytstamp,
    };

    Pylevdtl.findOne({
      where: {
        pyempcde: req.body.pyempcde//,
       // pyappdte: req.body.pyappdte,
       // pylevsts: req.body.pylevsts
      }
    })
      .then(leave => {
        if (!leave) {
          Pylevdtl.create(leaveData)
            .then(leave => {
              res.status(201).json({isExecuted:true, message:"New Leave Applied. Please wait for approval."});
              res.end();
            })
            .catch(err => {
              res.json({isExecuted:false, message:"Error to apply leave."});
              res.end();
            }) 
        } else {
          res.json({isExecuted:false, message:"Leave already applied with this combination!!!"});
          res.end();
        }
      })
      .catch(err => {
        res.json({isExecuted:false, message:"Error to apply leave!!!"});
        res.end();
      })
  });
  

module.exports = router