'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./routes/login/local-strategy')(passport);

var cookieSession = require('cookie-session')
app.use(cookieSession({
    name: 'session',
    keys: ['token'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hospital');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

app.use(function (req, res, next) {
    if (req.url == '/login') {
        next()
    }
    else {
        if (req.session && req.session.passport && req.session.passport.user) {
            req.session.nowInMinutes = Math.floor(Date.now() / 1e3)-(6*3600);
            next()
        }
        else {
            res.status(403).send({ message: 'NOT AUTHORIZED' });
        }
    }
})

app.use('/patients', require('./routes/patients/middleware'), require('./routes/patients/patients'))
app.use('/doctors', require('./routes/doctors/middleware'), require('./routes/doctors/doctors'))
app.use('/login', require('./routes/login/middleware'), require('./routes/login/login'))



app.listen(3000)
console.log("server is running on 3000 port");