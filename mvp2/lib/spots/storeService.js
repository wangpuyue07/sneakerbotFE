var events = require('./../application/eventBroker');
var service = require('../application/serviceUtils');
var constants = require('../constants');
var objects = require('../objects');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.spot);
var organisationService = require('./organisationService');
var principalService = require('../users/principalService');
var userService = require('../users/userService');
var genUtils = require('./../application/genUtils');
var spotService = require('./spotService');


exports.createStore = function (command, options) {
    var rules = {
        names: spotService.namesValidation.required(),
        organisationId: Joi.string().regex(constants.regex.uuid).required(),
        googleId: Joi.string(),
        externalId: Joi.string(),
        email: Joi.string().email().required()
    };
    service.validateSync(command, rules, options);
    return persistence.createItem({
            id: genUtils.createTimeUuid(),
            names: command.names,
            email: command.email,
            category: constants.spotCategories.store,
            organisationId: command.organisationId,
            googleId: command.googleId,
            externalId: command.externalId,
            _userContext: command._userContext
        },
        {
            uniqueQuery: {email: command.email, deleted: 0}
        });
};

exports.signUp = function (command) {
    var schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(7)
    };
    delete command._userContext;
    service.validateSync(command, schema, {userContextRequired: false});
    var emailStruct = genUtils.getEmailStruct(command.username);
    return organisationService.getOrganisation({domain: emailStruct.domain}, {userContextRequired: false}).then(org => {
        if (!org) throw new service.ValidationError('Organisation is not registered.');
        return principalService.checkExists(command.username).then(function (exists) {
            if (exists) throw new service.ValidationError('Email already exists.');
            return principalService.createPrincipal(command.username, command.password, command._userContext);
        }).then(function (res) {
            var store = {
                email: command.username,
                names: [{text: emailStruct.address}],
                organisationId : org.id
            };
            return exports.createStore(store, { userContextRequired: false });
        }).then(function (res) {
            return userService.signIn(command);
        })
    });
};

exports.updateStore = function (command) {
    var rules = spotService.standardUpdateSchema();
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.getStore = function (command) {
    service.validateUuidId(command);
    return persistence.getItem(command, {responseObject: objects.store_S});
};

exports.getStoreContext = function (command) {
    service.validateSync(command, {
        id: Joi.string().guid(),
        apiKey: Joi.string(),
        externalId: Joi.string(),
        email: Joi.string()
    }, {userContextRequired: false});
    return persistence.getItem(command, {responseObject: objects.store_L});
};

exports.deleteStore = function (command) {
    service.validateUuidId(command);
    return persistence.deleteItem(command);
};

exports.listStores = function (command) {
    var rules = {
        organisationId: Joi.string().regex(constants.regex.uuid).required()
    };
    command = service.validateListCommand(command, rules);
    command.category = constants.spotCategories.store;
    return persistence.listItems(command, {responseObject: objects.store_S});
};