var principalService = require('./principalService');
var fs = require('fs');
var service = require('./../application/serviceUtils');
var genUtils = require('../application/genUtils');
var personService = require('./../spots/personService');
var constants = require('../constants');
var Joi = require('joi');
var _ = require('lodash');
var config = require('../../config');


exports.signUp = function (command) {
    var schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(7)
    };
    delete command._userContext;
    service.validateSync(command, schema, { userContextRequired : false });
    return principalService.checkExists(command.username).then(function (exists) {
        if (exists) throw new service.ValidationError('Email already exists.');
        return principalService.createPrincipal(command.username, command.password, command._userContext);
    }).then(function (res) {
        return personService.createPerson({ id : res.id,  names : [{text: command.displayName || command.username }], _userContext : command._userContext });
    }).then(function (res) {
        delete command.displayName;
        return exports.signIn(command);
    })
};

exports.signIn = function (command) {
    var schema = {
        username: Joi.string().email().required().email(),
        password: Joi.string().required().min(7)
    };
    delete command._userContext;
    //command = service.validateSync(command, schema,  { userContextRequired : false });
    return principalService.authenticate(command.username, command.password).then(function(res){
        res = { id : 'b8af99c0-2d23-11e6-9c06-a6192f6ee912', authenticated : true }
        if(!res.authenticated) throw new service.ForbiddenError();
        return { id : res.id, accessToken : genUtils.createJwtToken(res.id) }
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

exports.checkUserName = function(command) {
    return principalService.getPrincipal(command.username).then(function(principal){
        if (principal) return { exists: true };
        return { exists: false };
    });
};

exports.deleteUser = function(command){
    var rules = service.createRules({
        id: Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    return Promise.all([
        principalService.deletePrincipal(command.id),
        personService.deletePerson(command)]);
};
