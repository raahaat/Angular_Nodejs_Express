const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_cor_leave_master = require('../models/con-cor-leave-master');



router.post('/concorleavemaster/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        leave_code: req.body.leave_code,
        leave_name: req.body.leave_name,   
        header_name: req.body.header_name,
        applicable_to: req.body.applicable_to,
        accumulation_flag: req.body.accumulation_flag,
        accumulation_frequiency: req.body.accumulation_frequiency,
        eligible_day: req.body.eligible_day,
        work_days: req.body.work_days,
        max_accumulation: req.body.max_accumulation,
        encashment_flag: req.body.encashment_flag,
        encashment_policy: req.body.encashment_policy,
        link_to_earns: req.body.link_to_earns,
        earning_code: req.body.earning_code,
        parcentage_to_pay: req.body.parcentage_to_pay,
        leave_reserved_type: req.body.leave_reserved_type,
        reserved_leave_link: req.body.reserved_leave_link,
        esb_include_flag: req.body.esb_include_flag,
        passage_eligible: req.body.passage_eligible,
        in_month_leave_gap: req.body.in_month_leave_gap,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };
    
    con_cor_leave_master.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concorleavemaster/list', (req, res) => {
  con_cor_leave_master.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concorleavemaster/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_cor_leave_master.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concorleavemaster/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_cor_leave_master.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Leave master is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concorleavemaster/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_cor_leave_master.update(
    {leave_code: req.body.leave_code,
      leave_name: req.body.leave_name,   
      header_name: req.body.header_name,
      applicable_to: req.body.applicable_to,
      accumulation_flag: req.body.accumulation_flag,
      accumulation_frequiency: req.body.accumulation_frequiency,
      eligible_day: req.body.eligible_day,
      work_days: req.body.work_days,
      max_accumulation: req.body.max_accumulation,
      encashment_flag: req.body.encashment_flag,
      encashment_policy: req.body.encashment_policy,
      link_to_earns: req.body.link_to_earns,
      earning_code: req.body.earning_code,
      parcentage_to_pay: req.body.parcentage_to_pay,
      leave_reserved_type: req.body.leave_reserved_type,
      reserved_leave_link: req.body.reserved_leave_link,
      esb_include_flag: req.body.esb_include_flag,
      passage_eligible: req.body.passage_eligible,
      in_month_leave_gap: req.body.in_month_leave_gap,
      insert_by: req.body.insert_by,
      insert_date: req.body.insert_date,
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
    res.json({isExecuted:false, message: "Leave Master is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router