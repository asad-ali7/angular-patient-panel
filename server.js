'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hospital');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    // res.status(403).send({message: 'much errors'});
    next()
})

app.use('/patients', require('./routes/patients/middleware'), require('./routes/patients/patients'))
app.use('/doctors', require('./routes/doctors/middleware'), require('./routes/doctors/doctors'))


app.listen(3000)
console.log("server is running on 3000 port");