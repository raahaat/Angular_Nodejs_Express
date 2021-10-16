const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const cor_lev_leav_detail = require('../models/cor-lev-leav-detail');



router.post('/corlevleavdetail/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        employee_code: req.body.employee_code,
        branch_code: req.body.branch_code,   
        designation_code: req.body.designation_code,   
        department_code: req.body.department_code,
        leave_type_code: req.body.leave_type_code,
        leave_code: req.body.leave_code,
        apply_date: req.body.apply_date,
        from_date: req.body.from_date,
        end_date: req.body.end_date,
        leave_purpose: req.body.leave_purpose,
        address_on_leave: req.body.address_on_leave,
        tel_mobile: req.body.tel_mobile,
        lfa_flag: req.body.lfa_flag,
        lfa_leave_avail: req.body.lfa_leave_avail,
        foreign_flag: req.body.foreign_flag,
        country_name: req.body.country_name,
        replacement1_code: req.body.replacement1_code,
        rep1_opinion_flag: req.body.rep1_opinion_flag,
        rep1_opinion_date: req.body.rep1_opinion_date,
        replacement2_code: req.body.replacement2_code,
        rep2_opinion_flag: req.body.rep2_opinion_flag,
        rep2_opinion_date: req.body.rep2_opinion_date,
        replacement3_code: req.body.replacement3_code,
        rep3_opinion_flag: req.body.rep3_opinion_flag,
        rep3_opinion_date: req.body.rep3_opinion_date,
        replacement4_code: req.body.replacement4_code,
        rep4_opinion_flag: req.body.rep4_opinion_flag,
        rep4_opinion_date: req.body.rep4_opinion_date,
        replacement5_code: req.body.replacement5_code,
        rep5_opinion_flag: req.body.rep5_opinion_flag,
        rep5_opinion_date: req.body.rep5_opinion_date,
        leave_status: req.body.leave_status,
        leave_remarks: req.body.leave_remarks,
        approver1_code: req.body.approver1_code,
        appr1_opinion_flag: req.body.appr1_opinion_flag,
        appr1_opinion_date: req.body.appr1_opinion_date,
        approver2_code: req.body.approver2_code,
        appr2_opinion_flag: req.body.appr2_opinion_flag,
        appr2_opinion_date: req.body.appr2_opinion_date,
        approver3_code: req.body.approver3_code,
        appr3_opinion_flag: req.body.appr3_opinion_flag,
        appr3_opinion_date: req.body.appr3_opinion_date,
        approver4_code: req.body.approver4_code,
        appr4_opinion_flag: req.body.appr4_opinion_flag,
        appr4_opinion_date: req.body.appr4_opinion_date,

        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };
/*      appr1_opinion_flag: { type: Sequelize.STRING },
        appr1_opinion_date: { type: Sequelize.DATE },
        approver2_code: { type: Sequelize.STRING },
        appr2_opinion_flag: { type: Sequelize.STRING },
        appr2_opinion_date: { type: Sequelize.DATE },
        approver3_code: { type: Sequelize.STRING },
        appr3_opinion_flag: { type: Sequelize.STRING },
        appr3_opinion_date: { type: Sequelize.DATE },
        approver4_code: { type: Sequelize.STRING },
        appr4_opinion_flag: { type: Sequelize.STRING },
        appr4_opinion_date: { type: Sequelize.DATE },
        approver5_code: { type: Sequelize.STRING },
        appr5_opinion_flag: { type: Sequelize.STRING },
        appr5_opinion_date: { type: Sequelize.DATE },
        approver6_code: { type: Sequelize.STRING },
        appr6_opinion_flag: { type: Sequelize.STRING },
        appr6_opinion_date: { type: Sequelize.DATE },
        approver7_code: { type: Sequelize.STRING },
        appr7_opinion_flag: { type: Sequelize.STRING },
        appr7_opinion_date: { type: Sequelize.DATE },
        insert_by: { type: Sequelize.STRING }, 
        insert_date: { type: Sequelize.DATE },
        update_by: { type: Sequelize.STRING },
        update_date: { type: Sequelize.DATE}
*/
    cor_lev_leav_detail.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/corlevleavdetail/list', (req, res) => {
  cor_lev_leav_detail.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/corlevleavdetail/list/:id', (req, res) => {
  let searchId = req.params.id;

  cor_lev_leav_detail.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/corlevleavdetail/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    cor_lev_leav_detail.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Leave detail is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/corlevleavdetail/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  cor_lev_leav_detail.update(
    {soft_code: req.body.soft_code,   
      process_flag: req.body.process_flag,   
      description: req.body.description,
      sort_description: req.body.sort_description,
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
    res.json({isExecuted:false, message: "Leave detail is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router