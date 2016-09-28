var service = require('../application/serviceUtils');
var Persistence = require('../application/persistence');
var spotService = require('./spotService');
var genUtils = require('../application/genUtils');
var constants = require('../constants');
var persistence = new Persistence(constants.entityTypes.spot);
var Joi = require('joi');

exports.listStaff = function(command, options){
    var rules = {
        organisationId: Joi.string().guid().required(),
        storeId: Joi.string().guid()
    };
   command = service.validateListCommand(command, rules, options);
   command.category = constants.spotCategories.staff;
   return persistence.listItems(command, rules);
};

exports.createStaff = function(command){
    var rules = service.createRules({
        names : spotService.namesValidation.required(),
        image: Joi.string(),
        storeId: Joi.string().guid().required(),
        organisationId: Joi.string().guid().required(),
        email: Joi.string().email(),
        _userContext: Joi.object().required()
    });
    
    service.validateSync(command, rules);
    command.id = genUtils.createTimeUuid();
    command.category = constants.spotCategories.staff;
    command.slug = command.names[0].text.replace(' ', '_').toLowerCase();
    return persistence.createItem(command);
};

exports.updateStaff = function (command) {
    var rules = spotService.standardUpdateSchema();
    rules.storeId = Joi.string();
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.deleteStaff = function(command) {
    var rules = service.createRules({
        id : Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    return persistence.deleteItem(command);
};