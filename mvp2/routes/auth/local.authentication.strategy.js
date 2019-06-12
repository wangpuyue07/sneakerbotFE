var passport = require('passport');
var config = require('../../config');
var genUtils = require('../../lib_new/application/genUtils');
var LocalStrategy = require('passport-local').Strategy;
var userService = require('../../lib_new/mid_service/userService');


exports.strategy = function(req, res){
    passport.authenticate('local-authentication', function(err, profile, info) {
        var error = err || info;
        if (error) return res.sendStatus(401);
        if (!profile) return res.sendStatus(404);
        if (profile.id) {
            var accessToken = genUtils.createJwtToken(profile.id);
            res.send({accessToken: accessToken});
        } else {
            res.send(profile);
        }

    })(req, res);
};

passport.use('local-authentication',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        userService.signIn({username: email, password: password}).then(res => {
            return new Promise((resove, reject) => {
                resove(res);
            });
        }).then(person => {
            done(null, person);
        }).catch(e => {
            done(e);
        })
    })
);
