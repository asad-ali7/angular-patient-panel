'use strict';
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('hospital', ['patients']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());



app.get('/patients', function (req, res) {
    db.patients.find(function (err, docs) {
        //console.log(docs);
        res.json(docs);


    })
});


app.post('/patients', function (req, res) {
    console.log(req.body);
    db.patients.insert(req.body, (err, doc) => {
        res.json(doc);

    })
})

app.delete('/patients/:id/delete', function (req, res) {
    var id = req.params.id;
    console.log(id);

    db.patients.remove({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        res.json(doc);
    })

})

app.get('/patients/:id/get', function (req, res) {
    var id = req.params.id;
    console.log(id);

    db.patients.findOne({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        res.json(doc);
    })

})

app.put('/patients/:id/update', function (req, res) {
    var id = req.params.id;
    console.log(id);

    db.patients.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $set: {
                name:req.body.name, email:req.body.email, age:req.body.age,
                address:req.body.address, city:req.body.city, gender:req.body.gender, password:req.body.password
            }
        }, new: true
    }, (err, doc) => {
        res.json(doc);
    })

})

// app.get('/', function (req, res) {
//     res.send("hello world from server.js");
// });
app.listen(3000)
console.log("server is running on 3000 port");