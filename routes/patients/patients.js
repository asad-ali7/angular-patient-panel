'use strict';
var express = require('express');
var router = express.Router();

let Patient = require('../../models/patient')
// var mongojs = require('mongojs');
// var db = mongojs('hospital', ['patients']);



router.get('/', function (req, res, next) { next() }, function (req, res) {
    Patient.find(function (err, docs) {
        res.json(docs);
    })
});

router.post('/', function (req, res, next) { next() }, function (req, res) {
    let patient = new Patient(req.body);
    console.log('--------------------',Patient)
    patient.save(function (err, patient) {
        res.json(patient);
    })
})

router.delete('/:id/delete', function (req, res, next) { next() }, function (req, res) {
    var id = req.params.id;
    Patient.remove({ _id: id }, (err, doc) => {
        res.json(doc);
    })

})

router.get('/:id/get', function (req, res, next) { next() }, function (req, res) {
    var id = req.params.id;
    Patient.findOne({ _id: id }, (err, doc) => {
        console.log(doc)
        res.json(doc);
    })

})

router.put('/:id/update', function (req, res, next) { next() }, function (req, res) {
    var id = req.params.id;
    
    Patient.findByIdAndUpdate(
        id,req.body,{new: true},(err, patient) => {
        // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(patient);
        }
    )
})

module.exports = router;