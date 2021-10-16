const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const Op = sequelize.Op;
var showerrorsucess = require('../showerrorsucess');
router.use(cors());
const Calendar = require('../models/calendar');

router.post('/calendar/save', (req, res) => {
    const calData = {
      title:      req.body.title,
      start:      req.body.start,
      startdate:  req.body.startdate,
      timefrom:   req.body.timefrom,
      timeto:     req.body.timeto,
      end:        req.body.end,
      enddate:    req.body.enddate,
      all_day:    req.body.all_day,
      repeat_with:req.body.repeat_with,
      meet_media: req.body.meet_media,
      location:   req.body.location,
      notify_with:req.body.notify_with,
      notify_time:req.body.notify_time, 
      notify_slab:req.body.notify_slab,
      email:      req.body.email,
      busy_flag:  req.body.busy_flag,
      visibility: req.body.visibility,
      description:req.body.description, 
      guest_id:   req.body.guest_id, 
      modify_event:req.body.modify_event, 
      invite_other:req.body.invite_other, 
      view_guest:  req.body.view_guest,
      login_user:  req.body.login_user,
      login_date:  req.body.login_date,
      userid:      req.body.userid,
      created:     req.body.created
      };

     Calendar.create(calData)
            .then(cal => {
              res.status(201).json({isExecuted:true, message:"New Task Added Successfully."});
              res.end();
            })
            .catch(err => {
              res.json({isExecuted:false, message:"Error to Save Data."});
              res.end();
            })
     });


     router.get('/calendar/data', (req, res) => {
       var userId = 'arif@gmail.com';
      Calendar.findAll(
        {where: {userid: userId}} //attributes: ['title', 'start','end','created', 'id', 'userid'],
      )
        .then(calData => {
          if (calData) {
            res.json({isExecuted:true, 
                      data: calData,
                      message:"Calendar Data fetched successfully."});
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

  //  calendar/delete/data/`+ id

    router.delete('/calendar/delete/data/:id', (req, res) => {
      let deleteId = req.params.id;
      
      Calendar.destroy(
        { where: {id: deleteId}}
      )
      .then(deletedData => {
            res.json({isExecuted:true, data: deletedData, message: "Caledar data of: "+ deleteId + " is deleted successfully."});
            res.end();
          })
        .catch(err => {
          res.json({isExecuted:false, message: "Calendar Data is not deleted for : "+ deleteId});
          res.end();
        });
    });

    router.get('/calendar/info/:id', (req, res) => {
      let calId = req.params.id;
      Calendar.findAll(
        { where: {id: calId}}
      )
       .then(calData => {
          if (calData) {
            res.json({isExecuted:true, data: calData, message: "Info of ID: "+ calId + " fetched successfully."});
            res.end();
          } else {
            res.json({isExecuted:false, message:"Calendar data does not exist!!!"});
            res.end();
          }
        })
        .catch(err => {
          res.json({isExecuted:false, message:err});
            res.end();
        });
    });


    router.put('/calendar/eventfullpage/update/:id', (req, res) => {
      let updatedId = req.params.id;
      Calendar.update(
        { title:      req.body.title,
          start:      req.body.start,
          startdate:  req.body.startdate,
          timefrom:   req.body.timefrom,
          timeto:     req.body.timeto,
          end:        req.body.end,
          enddate:    req.body.enddate,
          all_day:    req.body.all_day,
          repeat_with:req.body.repeat_with,
          meet_media: req.body.meet_media,
          location:   req.body.location,
          notify_with:req.body.notify_with,
          notify_time:req.body.notify_time, 
          notify_slab:req.body.notify_slab,
          email:      req.body.email,
          busy_flag:  req.body.busy_flag,
          visibility: req.body.visibility,
          description:req.body.description, 
          guest_id:   req.body.guest_id, 
          modify_event:req.body.modify_event, 
          invite_other:req.body.invite_other, 
          view_guest:  req.body.view_guest,
          login_user:  req.body.login_user,
          login_date:  req.body.login_date,
          userid:      req.body.userid,
          created:     req.body.created},
  
        {where: {id: updatedId}}
      )
      .then((updatedData)=> {
        res.json({isExecuted:true, data: updatedData, message:"Successfully Updated Data For: " + updatedId});
        res.end();
      })
      .catch (err => {
        res.json({isExecuted:false, message:"Unknown Error: "+ err});
        res.end();
      })
    });


module.exports = router;