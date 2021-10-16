const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../models/user')
var showError = require('../showerrorsucess');
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        const hashPassword = bcrypt.hashSync(userData.password,10);
        userData.password = hashPassword;
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: '24h'
            })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user) {  
      if (bcrypt.compareSync(req.body.password,user.password)) {
        
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: '24h'
        })
        res.json({isExecuted:true, data: user, message:"Logged In Successfully!!!", token: token });
      } else {
        res.json({isExecuted:false, message:"Incorrect email & password combination!!!"});
    }} else {
       res.json({isExecuted:false, message:"User does not exist!!!"});
      }
    
    })
  .catch(err => {
    res.json({isExecuted:false, message:"Error occured for email & password!!!"});
  })
});

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users