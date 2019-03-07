'use strict';
var express = require('express');
var router = express.Router();
let errHand =require('../errorHandler/errorHandler')
let Doctor = require('../../models/doctor')
// var mongojs = require('mongojs');
// var db = mongojs('hospital', ['doctors']);



router.get('/', function (req, res, next) { next() }, function (req, res) {
    Doctor.find(function (err, docs) {
        res.json(docs);
    })
});

router.post('/', function (req, res, next) { next() }, function (req, res) {
    let doctor = new Doctor(req.body);
    doctor.save(function (err, doctor) {
        if (err ){
            res.status(500).send( errHand.errHandler(err))
        }
        else {
            res.json(doctor);
        }
    })
})

router.delete('/:id/delete', function (req, res, next) { next() }, function (req, res) {
    var id = req.params.id;
    Doctor.remove({ _id: id }, (err, doc) => {
        res.json(doc);
    })

})

router.get('/:id/get', function (req, res, next) { next() }, function (req, res) {
    var id = req.params.id;
    Doctor.findOne({ _id: id }, (err, doc) => {
        res.json(doc);
    })

})

router.put('/:id/update', function (req, res, next) { next() }, function (req, res) {
    var id = req.params.id;

    Doctor.findByIdAndUpdate(
        id, req.body, { new: true }, (err, doctor) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(doctor);
        }
    )
})

module.exports = router;
