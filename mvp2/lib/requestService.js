var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('./application/persistence');
var genUtils = require('./application/genUtils');
var constants = require('./constants');
var service = require('./application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.request);

exports.createRequest = function (command) {
    var rules = {
        sku: Joi.string().required(),
        description: Joi.string().required(),
        colour: Joi.string().required(),
        size: Joi.string().required(),
        expiry: Joi.date().min('now').required(),
        productType: Joi.string().required(),
        customerName: Joi.string(),
        customerPhone: Joi.string(),
    };
    service.validateSync(command, rules);
    command.id = genUtils.createTimeUuid();
    command.organisationId = command._userContext.organisation.id;
    return persistence.createItem(command);
};

exports.updateRequest = function (command) {
    var rules = {
        id: Joi.string().guid().required(),
        description: Joi.string()
    };
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.getRequest = function (command) {
    service.validateUuidId(command);
    return persistence.getItem(command);
};

exports.listRequest = function (command) {
    var rules = {
        staffId: Joi.string().guid()
    };
    command = service.validateListCommand(command, rules);
    return persistence.listItems(command);
};

exports.getRequestById = function (ids) {
    var command = service.validateListCommand({});
    command.id = { $in : ids };
    return persistence.listItems(command);
};

exports.deleteRequest = function (command) {
    service.validateUuidId(command);
    return persistence.deleteItem(command);
};