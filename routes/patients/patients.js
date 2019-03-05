'use strict';
var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('hospital', ['patients']);

router.get('/', function (req, res, next) {next()}, function (req, res) {
    db.patients.find(function (err, docs) {
        res.json(docs);
    })
});

router.post('/', function (req, res, next) {next()}, function (req, res) {
    db.patients.insert(req.body, (err, doc) => {
        res.json(doc);

    })
})

router.delete('/:id/delete', function (req, res, next) {next()}, function (req, res) {
    var id = req.params.id;
    db.patients.remove({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        res.json(doc);
    })

})

router.get('/:id/get', function (req, res, next) {next()}, function (req, res) {
    var id = req.params.id;
    db.patients.findOne({ _id: mongojs.ObjectId(id) }, (err, doc) => {
        console.log(doc)
        res.json(doc);
    })

})

router.put('/:id/update', function (req, res, next) {next()}, function (req, res) {
    var id = req.params.id;
    db.patients.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $set: {
                name: req.body.name, email: req.body.email, age: req.body.age,
                address: req.body.address, city: req.body.city, gender: req.body.gender, password: req.body.password
            }
        }, new: true
    }, (err, doc) => {
        res.json(doc);
    })
})

module.exports = router;