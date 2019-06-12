//var principalService = require('./principalService');
var principalService = require('../../lib_new/base_service/newPrincipalService');
var fs = require('fs');
var redis = require('../application/providers/redis');
var service = require('../application/serviceUtils');
var genUtils = require('../application/genUtils');
//var personService = require('./../spots/personService');
var constants = require('../application/constants');
var Joi = require('joi');
var _ = require('lodash');
var config = require('../../config');
var mailgun = require('mailgun-js')({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});
var mailcomposer = require('mailcomposer');


// exports.signUp = function (command) {
//     var schema = {
//         username: Joi.string().required().email(),
//         password: Joi.string().required().min(7)
//     };
//     delete command._userContext;
//     service.validateSync(command, schema, {userContextRequired: false});
//     return principalService.checkExists(command.username).then(function (exists) {
//         if (exists) throw new service.ValidationError('Email already exists.');
//         return principalService.createPrincipal(command.username, command.password, command._userContext);
//     }).then(function (res) {
//         return personService.createPerson({
//             id: res.id,
//             names: [{text: command.displayName || command.username}],
//             _userContext: command._userContext
//         });
//     }).then(function (res) {
//         delete command.displayName;
//         return exports.signIn(command);
//     })
// };

exports.signIn = function (command) {
    var schema = {
        username: Joi.string().email().required().email(),
        password: Joi.string().required().min(20)
    };
    delete command._userContext;
    command = service.validateSync(command, schema,  { userContextRequired : false });
    return principalService.authenticate(command.username, command.password).then(function (res) {
        if (!res.authenticated)  return res;
        return {id: res.cid, accessToken: genUtils.createJwtToken(res.cid), role:res.role};
    });
};

exports.changePassword = function (command) {
    var schema = {
        username: Joi.string().email().required(),
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    };

    command = service.validateSync(command, schema);
    return principalService.changePassword(command.username, command.oldPassword, command.newPassword);
};

exports.createPasswordResetCode = function (command) {
    var schema = {
        username: Joi.string().email().required()
    };
    service.validateSync(command, schema);
    if (!command.expiryDays && command.expiryDays !== 0) command.expiryDays = 1;
    return principalService.createPasswordResetCode(command.username, command.expiryDays, command._userContext).then(function (code) {
        console.log('Send code here.')
    })
};

exports.checkPasswordResetCode = function (command) {
    var schema = {
        code: Joi.string().required()
    };
    service.validateSync(command, schema);
    return principalService.checkPasswordResetCode(command.code);
};

exports.changePasswordWithCode = function (command) {
    var schema = {
        username: Joi.string().email().required(),
        code: Joi.string().required(),
        password: Joi.string().min(7).required()
    };
    service.validateSync(command, schema);
    return principalService.changePasswordWithCode(command.username, command.code, command.password);
};

exports.checkUserName = function (command) {
    return principalService.getPrincipal(command).then(function (principal) {
        if (principal.length!=0) return {exists: true};
        return {exists: false};
    });
};

exports.deleteUser = function (command) {
    var rules = service.createRules({
        id: Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    return Promise.all([
        principalService.deletePrincipal(command.id),
        personService.deletePerson(command)]);
};

exports.createTicket = function (command) {
    var ticket = genUtils.createApiKey(command.username);
    var client = redis.client();
    client.hmset(ticket, command);
    var mail = mailcomposer({
        from: 'hello@seekstock.com',
        to: command.username,
        subject: 'Welcome To Seek Stock',
        html: '<!DOCTYPE html> <html lang="en"><head> <meta charset="UTF-8"> <title>Title</title> </head> <body><p>\
        &nbsp;&nbsp;\
    </p>\
    <h1 style="text-align: center;">\
        SeekStock\
        </h1>\
        <div style="padding:10px 200px;">\
        <p style="text-align: left; margin-top: 5px; margin-bottom: 5px; line-height: 1.5em;">\
        <span style="color: rgb(89, 89, 89);"><sup><span style="font-family: arial, helvetica, sans-serif; font-size: 20px;">\
        Your Store allows your team to submit feedback on product or share new product ideas. Join the conversation and see what\
         other stores are saying!</span></sup></span>\
        </p>\
        <p style="text-align: left;">\
        <br/>\
        </p>\
        <p style="text-align: left; margin-top: 5px; margin-bottom: 5px; line-height: 1.5em;">\
        <span style="color: rgb(89, 89, 89);"><sup>\
        <span style="color: rgb(89, 89, 89); font-family: arial, helvetica, sans-serif; font-size: 20px;">\
        To get started, please complete your store registration by clicking the link below.</span></sup></span>\
        <span style="color: rgb(63, 63, 63);"><sup><span style="font-family: arial, helvetica, sans-serif; font-size: 20px;">\
        </span></sup><sup><span style="font-family: arial, helvetica, sans-serif; font-size: 20px;"></span></sup></span>\
        </p> <p> <br/> </p> <div style="text-align: center;height: 20px">\
        <a href="http://localhost:3000/register?ticket=' + ticket + '" target="_Blank" style="background-color: #5dbbd7;padding: 10px 20px;font-size: 20px;text-decoration: none;color: white;border-radius: 20px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">\
        Complete Registration</a>\
        </div> </div></body> </html>'});


    return new Promise(function (resolve) {
        mail.build(function(mailBuildError, message) {

            var dataToSend = {
                to: command.username,
                message: message.toString('ascii')
            };
            mailgun.messages().sendMime(dataToSend, function (sendError, body) {
                resolve(true);
            });

        });
    })


};

exports.postTicket = function (command) {
    var client = redis.client();
    return client.hgetall(command.ticket).then(function (info) {
        return info;
    });
};

//




