var jwt = require('jwt-simple');
var config = require('../config');
var spotService = require('./../lib/spots/spotService');

var anonymousProfile = { displayName : 'anonymous' };

exports.hydrateProfile = function (req, res, next) {
    var command = {};
    if(req.headers['x-gimanzo-api-key']){
        command.apiKey = req.headers['x-gimanzo-api-key'];
    } else {
        var accessToken = req.cookies.accessToken || req.headers.authorization;
        if (!accessToken) {
            req.profile = anonymousProfile;
            return next();
        }
        accessToken = accessToken.replace('Bearer ', '');
        try {
            var decoded = jwt.decode(accessToken, config.jwtSecret);
            if (decoded.exp < Date.now()) return next();
            command.id = decoded.iss;
        } catch (e) {
            console.error(e);
            return next();
        }
    }
    var authenticatedUser;
    return spotService.getSpot(command).then(function (profileResponse) {
        authenticatedUser = profileResponse || anonymousProfile;
        if (req.query.actingAsUserId) return spotService.getSpot({id: req.query.actingAsUserId});
    }).then(function(actingAsUser){
        authenticatedUser.staffId = req.headers['x-seekstock-staffid'];
        if(actingAsUser){
            actingAsUser.authenticatedUser = authenticatedUser;
            req.profile = actingAsUser;
        } else {
            req.profile= authenticatedUser;
        }
        next();
    })
};
