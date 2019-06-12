var jwt = require('jwt-simple');
var config = require('../config');
var newPrincipalService = require('../lib_new/base_service/newPrincipalService');
var staffService = require('../lib_new/base_service/staffService');
var storeService = require('../lib_new/base_service/storeService');
var anonymousProfile = {displayName: 'anonymous'};

// exports.hydrateProfile = function (req, res, next) {
//     var command = {};
//     if(req.headers['x-gimanzo-api-key']){
//         command.apiKey = req.headers['x-gimanzo-api-key'];
//     } else {
//         var accessToken = req.cookies.accessToken || req.headers.authorization;
//         if (!accessToken) {
//             req.profile = anonymousProfile;
//             return next();
//         }
//         accessToken = accessToken.replace('Bearer ', '');
//         try {
//             var decoded = jwt.decode(accessToken, config.jwtSecret);
//             if (decoded.exp < Date.now()) return next();
//             command.id = decoded.iss;
//         } catch (e) {
//             console.error(e);
//             return next();
//         }
//     }
//     var authenticatedUser;
//     return spotService.getSpot(command).then(function (profileResponse) {
//
//         authenticatedUser = profileResponse || anonymousProfile;
//         if (req.query.actingAsUserId) return spotService.getSpot({id: req.query.actingAsUserId});
//     }).then(function(actingAsUser){
//         authenticatedUser.staffId = req.headers['x-seekstock-staffid'];
//         if(actingAsUser){
//             actingAsUser.authenticatedUser = authenticatedUser;
//             req.profile = actingAsUser;
//         } else {
//             req.profile= authenticatedUser;
//         }
//         next();
//     })
// };

exports.hydrateProfile = function (req, res, next) {
    var command = {};
    if (req.headers['x-gimanzo-api-key']) {
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


    // return spotService.getSpot(command).then(function (profileResponse) {
    //
    //     authenticatedUser = profileResponse || anonymousProfile;
    //     if (req.query.actingAsUserId) return spotService.getSpot({id: req.query.actingAsUserId});
    // }).then(function(actingAsUser){
    //     authenticatedUser.staffId = req.headers['x-seekstock-staffid'];
    //     if(actingAsUser){
    //         actingAsUser.authenticatedUser = authenticatedUser;
    //         req.profile = actingAsUser;
    //     } else {
    //         req.profile= authenticatedUser;
    //     }
    //     next();
    // });
    return newPrincipalService.getAPrincipalById(command.id).then(function (principal) {
        var principal = principal;
        if(principal && principal.active == 0){
            principal = null;
        }
        if(!principal) {
            req.profile = "";
            next();
        }else {
            if (principal.type == 'store') {
                return storeService.getStore({email: principal.username}).then(function (profileResponse) {
                    authenticatedUser = profileResponse || anonymousProfile;
                    authenticatedUser.staffId = req.headers['x-seekstock-staffid'];
                    req.profile = authenticatedUser;
                    next();
                });
            } else {
                return staffService.getStaff({email: principal.username}).then(function (profileResponse) {
                    authenticatedUser = profileResponse || anonymousProfile;
                    authenticatedUser.staffId = req.headers['x-seekstock-staffid'];
                    req.profile = authenticatedUser;
                    next();
                });
            }
        }
    });
};