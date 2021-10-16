const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_cor_att_schedule = require('../models/con-cor-att-schedule');



router.post('/concorattschedule/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        schedule_code: req.body.schedule_code,
        schedule_name: req.body.schedule_name,
        start_date: req.body.start_date,   
        end_date: req.body.end_date,
        in_time: req.body.in_time,
        exit_time: req.body.exit_time,
        late_entry_time: req.body.late_entry_time,
        night_shift_flag: req.body.night_shift_flag,
        valid_flag: req.body.valid_flag,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };

    con_cor_att_schedule.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concorattschedule/list', (req, res) => {
  con_cor_att_schedule.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concorattschedule/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_cor_att_schedule.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concorattschedule/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_cor_att_schedule.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Attendance Schedule is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concorattschedule/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_cor_att_schedule.update(
    {schedule_code: req.body.schedule_code,
      schedule_name: req.body.schedule_name,
      start_date: req.body.start_date,   
      end_date: req.body.end_date,
      in_time: req.body.in_time,
      exit_time: req.body.exit_time,
      late_entry_time: req.body.late_entry_time,
      night_shift_flag: req.body.night_shift_flag,
      valid_flag: req.body.valid_flag,
      update_by: req.body.update_by,
      update_date: req.body.update_date
    },
    {where: {IDNO: updatedId}}
  )
  .then(updateData => {
    res.json({message : 'Successfully Updated.'});
    res.end();
  })
  .catch(err => {
    res.json({isExecuted:false, message: "Attendance Schedule is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router