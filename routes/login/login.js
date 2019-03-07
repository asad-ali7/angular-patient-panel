'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');

let Doctor = require('../../models/doctor')

// router.post('/', function (req, res, next) { next() }, function (req, res) {
//     console.log(req.body);
// })
router.post('/',
  passport.authenticate('local', { session: true }),
  function(req, res) {
      console.log('--------',req.user);
      res.send(req.user);
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // res.redirect('/users/' + req.user.username);
  });

module.exports = router;