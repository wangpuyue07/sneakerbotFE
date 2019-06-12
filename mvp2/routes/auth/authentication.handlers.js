var passport = require('passport');
var genUtils = require('../../lib_new/application/genUtils');
var service = require('../../lib_new/application/serviceUtils');
var google = require('./google.authentication.strategy');
var local = require('./local.authentication.strategy');

var oAuthStrategies = {
    google : google.strategy
};

exports.localHandler = local.strategy;

// exports.oAuthAuthenticationHandler = function(req, res){
//         var destinationName = req.params.name;
//         var strategy = oAuthStrategies[destinationName];
//         if(!strategy) throw new service.ValidationError('The given strategy is not valid.', 'name');
//         strategy(req, res);
// };
//
// exports.oAuthCallbackMiddleware = function (req, res, next){
//     var name = req.query.name;
//     passport.authenticate(name + '-authentication', {
//         failureRedirect: '/signup',
//         session: false
//     })(req, res, next);
// };

exports.oAuthCallbackHandler = function (req, res) {
    var accessToken = genUtils.createJwtToken(req.user.id);
    delete req.user;
    service.setCookie(res, accessToken);
    res.redirect('/')
};