'use strict';
let LocalStrategy = require('passport-local').Strategy;
let Doctor = require('../../models/doctor');
let Patient = require('../../models/patient')


module.exports = function (passport) {
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
    },
        function (req, email, password, done) {
            let Model = (req.body.type == 'patient') ? Patient : Doctor;
            Model.findOne({ email: email }, (err, doc) => {
                if (err) { return done(err); }
                if (!doc) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!doc.validPassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, doc);
            })
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}