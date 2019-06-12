var config = require('../config');
var logger = require('../lib_new/application/logger')('Web Errors.');
var service = require('../lib_new/application/serviceUtils');
var fs = require('fs');
var util = require('util');
var path = require('path');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.status(404).end();
    });

    app.use(function (err, req, res, next) {
        if(err.category === 'Validation') {
            service.sendError(err, res);
        } else if(err.category === 'SignIn') {
            fs.readFile(path.join(process.cwd() + '/public/dist/index.html'), function read(err2, data) {
                var page = data.toString();
                var match = '<!--SIGNIN-MESSAGE-->';
                var messageField = util.format('<div class="error-message" id="sign-in-message"><i class="fa fa-hand-peace-o"></i>  <span>%s</span></div>', err.message);
                page = page.replace(match, messageField);
                res.send(page);
            });
        } else {
            logger.error(err);
            res.status(500).end();
        }
    });
};  