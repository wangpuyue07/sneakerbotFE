var activityService = require('./activity/activityService');
var service = require('./application/serviceUtils');
var Joi = require('joi');
var sql = require('./application/providers/sqlClient');
var constants = require('./constants');
var Persistence = require('./application/persistence');
var persistence = new Persistence(constants.entityTypes.staffActivityReads);


exports.markAsRead = function (command) {
    var rules = {
        notificationIds: Joi.array(Joi.string().guid())
    };
    command = service.validateSync(command, rules);
    if(command.notificationIds.length<1) return new Promise(resolve => { resolve(); });
    return persistence.createItem({staffId: command._userContext.staffId, notificationIds: command.notificationIds}).then(x => {
        return x;
    });
};

exports.getNews = function (command) {
    command.action = { $or : [constants.actions.createdStaffFeedback, constants.actions.createdStaffRequest]};
    return activityService.getLatest(command);
};