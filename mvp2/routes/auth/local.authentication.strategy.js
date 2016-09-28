var passport = require('passport');
var config = require('../../config');
var genUtils = require('../../lib/application/genUtils');
var LocalStrategy = require('passport-local').Strategy;
var userService = require('../../lib/users/userService');
var spotService = require('../../lib/spots/spotService');
var service = require('../../lib/application/serviceUtils');

exports.strategy = function(req, res){
    passport.authenticate('local-authentication', function(err, profile, info) {
        var error = err || info;
        if (error) return res.sendStatus(401);
        if (!profile) return res.sendStatus(404);
        var accessToken = genUtils.createJwtToken(profile.id);
        res.send({ accessToken : accessToken });
    })(req, res);
};

passport.use('local-authentication', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function(email, password, done) {
    userService.signIn({ username : email, password : password}).then(res => {
        if(!res.id) throw new service.ForbiddenError();
        return spotService.getSpot({email: email});
    }).then(person => {
        done(null, person);
    }).catch(e => {
        done(e);
    })
}));
