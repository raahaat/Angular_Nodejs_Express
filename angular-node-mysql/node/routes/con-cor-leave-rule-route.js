const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_cor_leave_rule = require('../models/con-cor-leave-rule');



router.post('/concorleaverule/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        rule_code: req.body.rule_code,
        rule_name: req.body.rule_name,   
        leave_code: req.body.leave_code,
        negative_bal_flg: req.body.negative_bal_flg,
        leave_without_pay_flg: req.body.leave_without_pay_flg,
        leave_reserve_type: req.body.leave_reserve_type,
        reserve_lev_link_name: req.body.reserve_lev_link_name,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };
    
    con_cor_leave_rule.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concorleaverule/list', (req, res) => {
  con_cor_leave_rule.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concorleaverule/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_cor_leave_rule.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concorleaverule/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_cor_leave_rule.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Leave Rule is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concorleaverule/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_cor_leave_rule.update(
    {rule_code: req.body.rule_code,
      rule_name: req.body.rule_name,   
      leave_code: req.body.leave_code,
      negative_bal_flg: req.body.negative_bal_flg,
      leave_without_pay_flg: req.body.leave_without_pay_flg,
      leave_reserve_type: req.body.leave_reserve_type,
      reserve_lev_link_name: req.body.reserve_lev_link_name,
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
    res.json({isExecuted:false, message: "Leave Rule is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router