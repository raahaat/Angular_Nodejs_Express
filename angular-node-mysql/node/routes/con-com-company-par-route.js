const express = require('express');
const router = express.Router();
const cors = require('cors');
const sequelize = require('sequelize');
router.use(cors());

const con_com_company_par = require('../models/con-com-company-par');



router.post('/concomcompanypar/add', (req, res) => {        
    const formData = {
        IDNO: req.body.IDNO,
        IDNAME: req.body.IDNAME,
        company_code: req.body.company_code,
        company_name: req.body.company_name,
        comp_short_name: req.body.comp_short_name,   
        company_address: req.body.company_address,
        comp_contact_no: req.body.comp_contact_no,
        company_mail: req.body.company_mail,
        company_website: req.body.company_website,
        comp_social_net_site: req.body.comp_social_net_site,
        company_mail_ip: req.body.company_mail_ip,
        retirement_age: req.body.retirement_age,
        local_currency: req.body.local_currency,
        bank_ac_no: req.body.bank_ac_no,
        defined_amount: req.body.defined_amount,
        round_off_Type: req.body.round_off_Type,
        insert_by: req.body.insert_by,
        insert_date: req.body.insert_date,
        update_by: req.body.update_by,
        update_date: req.body.update_date
    };

    con_com_company_par.create(formData)
    .then((data)=> {
      res.json({message : 'Successfully inserted.'});
      res.end();
    }).catch((err)=> {
        console.log('Error');
        res.json({message : 'Insert fail !!!'});
        res.end();
    })
});


router.get('/concomcompanypar/list', (req, res) => {
  con_com_company_par.findAll()
      .then(getData => {  
          res.json({isExecuted:true, data: getData});
          res.end();     
      })
});

router.get('/concomcompanypar/list/:id', (req, res) => {
  let searchId = req.params.id;

  con_com_company_par.findOne(
    { where: {IDNO: searchId
            }
    }
  )
    .then(getData => {  
        res.json({isExecuted:true, data: getData});
        res.end();     
    })
});

router.delete('/concomcompanypar/delete/:id', (req, res) => {
    let deleteId = req.params.id;
    
    con_com_company_par.destroy(
      { where: {IDNO: deleteId}}
    )
    .then(deletedData => {
          res.json({isExecuted:true, data: deletedData});
          res.end();
        })
      .catch(err => {
        res.json({isExecuted:false, message: "Company Parameter is not deleted for : "+ deleteId});
        res.end();
      });
});

router.put('/concomcompanypar/edit/:id', (req,res) => {
  let updatedId = req.params.id;
  con_com_company_par.update(
    {company_code: req.body.company_code,
      company_name: req.body.company_name,
      comp_short_name: req.body.comp_short_name,   
      company_address: req.body.company_address,
      comp_contact_no: req.body.comp_contact_no,
      company_mail: req.body.company_mail,
      company_website: req.body.company_website,
      comp_social_net_site: req.body.comp_social_net_site,
      company_mail_ip: req.body.company_mail_ip,
      retirement_age: req.body.retirement_age,
      local_currency: req.body.local_currency,
      bank_ac_no: req.body.bank_ac_no,
      defined_amount: req.body.defined_amount,
      round_off_Type: req.body.round_off_Type,
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
    res.json({isExecuted:false, message: "Company Parameter is not updated for : "+ updatedId});
    res.end();
  });
});


module.exports = router