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







// router.post('/', function (req, res, next) {
//     passport.authenticate('local',{session: false}, function (err, user, info) {
//         console.log('-------------------------',err,'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', user)

//         // if (err) { return next(err); }
//         // if (!user) { return res.redirect('/login'); }
//         // req.logIn(user, function (err) {
//         //     if (err) { return next(err); }
//         //     return res.redirect('/users/' + user.username);
//         // });
//     })(req, res, next);
// });
module.exports = router;