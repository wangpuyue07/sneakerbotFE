var events = require('./../application/eventBroker');
var service = require('../application/serviceUtils');
var constants = require('../constants');
var objects = require('../objects');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var persistence = new Persistence(constants.entityTypes.organisation);

exports.createOrganisation = function (command, options) {
    var rules = {
        domain: Joi.string().required(),
        parentId: Joi.number().integer(),
        leadUserEmail: Joi.string().email().required(),
        productUrlPrefix: Joi.string().uri().required(),
        productSearchIndex: Joi.string().required()
    };
    service.validateSync(command, rules, options);
    command.id = genUtils.createTimeUuid();
    return persistence.createItem(command,
        {
            uniqueQuery: {domain: command.domain, deleted: 0}
        });
};

exports.updateOrganisation = function (command) {
    var rules = {
        id: Joi.string().guid(),
        domain: Joi.string(),
        leadUserEmail: Joi.string().email(),
        parentId: Joi.number().integer()
    };
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.deleteOrganisation = function (command) {
    service.validateIntId(command);
    return persistence.deleteItem(command);
};

exports.getOrganisation = function (command, options) {
    var rules = {
        id: Joi.string().guid(),
        domain: Joi.string()
    };
    service.validateSync(command, rules, options);
    return persistence.getItem(command);
};

exports.listOrganisations = function (command) {
    var rules = {
        parentId: Joi.number().integer()
    };
    command = service.validateListCommand(command, rules);
    return persistence.listItems(command, {responseObject: objects.organisation_L});
};

exports.batchIndex = function () {
    return persistence.batchFetch(50, function (items) {
        return suggestService.batchIndex(items, constants.entityTypes.organisation);
    })
};
