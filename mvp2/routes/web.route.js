var express = require('express');
var route = express.Router();
var util = require('util');
var path = require('path');
var config = require('../config');
var service = require('../lib_new/application/serviceUtils');

route.post('/sign-in', function (req, res) {
    userService.signIn(req.body).then(function (data) {
        service.setCookie(res, data.accessToken);
        if (req.headers.referer) var refererPath = req.headers.referer.replace(req.headers.origin, '');
        res.redirect(302, refererPath);
    }).catch(function (err) {
        res.status(403);
        res.render('landing.html', {status: 403});
    });
});

route.post('/reset-password-with-code', function (req, res) {
    userService.changePasswordWithCode(req.body).then(function () {
        return userService.signIn(req.body);
    }).then(function (data) {
        service.setCookie(res, data.accessToken);
        res.redirect(302, '/');
    }).catch(function (err) {
        console.error(err);
        res.status(403);
        res.render('landing.html', {status: 403});
    });
});

route.get('/sign-out', function (req, res) {
    service.setCookie(res, 'expired');
    res.redirect(302, '/login');
});

// route.get('/dashboard',function(req,res){
//     console.log("12323");
// });
route.get(new RegExp('^[^.]+$'), function (req, res, next) {
    if (req.path.indexOf('/api') === 0) {
        return next();
    }
    //res.sendFile(path.join(__dirname + '/../public/dist/index.html'));
    //res.sendFile(path.resolve(__dirname +'/../public/new/welcome.html'));
    res.sendFile(path.join(__dirname + '/../public/new/welcome.html'));
});


module.exports = route;
