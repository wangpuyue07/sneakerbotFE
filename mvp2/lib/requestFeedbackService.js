var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('./application/persistence');
var genUtils = require('./application/genUtils');
var constants = require('./constants');
var service = require('./application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.feedback);

exports.createRequestFeedback = function (command) {
    console.log(command);
    var rules = {
        sku: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.array().items(Joi.string().required()).required(),
        appliesTo: Joi.array().items(Joi.string())
    };
    service.validateSync(command, rules);
    command.id = genUtils.createTimeUuid();
    command.organisationId = command._userContext.organisation.id;
    return persistence.createItem(command);
};

exports.updateRequestFeedback = function (command) {
    var rules = {
        id: Joi.string().guid().required(),
        description: Joi.string()
    };
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.getRequestFeedback = function (command) {
    service.validateUuidId(command);
    return persistence.getItem(command);
};

exports.listRequestFeedback = function (command) {
    var rules = {
        staffId: Joi.string().guid()
    };
    command = service.validateListCommand(command, rules);
    return persistence.listItems(command);
};

exports.getRequestFeedbackById = function (ids) {
    var command = service.validateListCommand({});
    command.id = { $in : ids };
    return persistence.listItems(command);
};

exports.deleteRequestFeedback = function (command) {
    service.validateUuidId(command);
    return persistence.deleteItem(command);
};