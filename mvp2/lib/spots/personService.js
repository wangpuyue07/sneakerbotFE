var service = require('../application/serviceUtils');
var Persistence = require('../application/persistence');
var spotService = require('./spotService');
var genUtils = require('../application/genUtils');
var constants = require('../constants');
var persistence = new Persistence(constants.entityTypes.spot);
var Joi = require('joi');

exports.createPerson = function(command){
    var rules = service.createRules({
        id: Joi.string().guid(),
        email: Joi.string(),
        externalId: Joi.string(),
        googleId: Joi.string(),
        names : spotService.namesValidation
    });
    if(!command.id) command.id = genUtils.createTimeUuid();
    service.validateSync(command, rules);
    command.category = constants.spotCategories.person;
    command.apiKey = genUtils.createApiKey(command.id);
    if(!command._userContext) command._userContext = { id : 'anonymous' };
    return persistence.createItem(command);
};

exports.updatePerson = function (command) {
    var rules = spotService.standardUpdateSchema();
    rules.location = spotService.locationValidation;
    rules.phoneNumber = Joi.string();
    rules.webAddress = Joi.string().regex(constants.regex.url);
    rules.externalId = Joi.string();
    rules.googleId = Joi.string();
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.deletePerson = function(command) {
    var rules = service.createRules({
        id : Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    return persistence.deleteItem(command);
};