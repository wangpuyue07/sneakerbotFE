var activityService = require('./activity/activityService');
var service = require('./application/serviceUtils');
var Joi = require('joi');
var sql = require('./application/providers/sqlClient');
var constants = require('./constants');
var genUtils = require('./application/genUtils');
var Persistence = require('./application/persistence');
var persistence = new Persistence(constants.entityTypes.notification);
var util = require('util');


exports.markAsRead = function (command) {
    var rules = {
        notificationIds: Joi.array(Joi.string().guid())
    };
    command = service.validateSync(command, rules);
    if (command.notificationIds.length < 1) return new Promise(resolve => {
        resolve();
    });
    var ids = command.notificationIds.map(x => {
        return "'" + x + "'"
    }).join(',');
    return sql.db.query(util.format("UPDATE notifications SET `read`=true where id in(%s);", ids));
};

exports.createNotification = function (command) {
    var schema = {
        recipientId: Joi.string().guid().required(),
        activityId: Joi.string().guid().required(),
        notificationType: Joi.string().required()
    };
    service.validateSync(command, schema, {userContextRequired: false});
    command.id = genUtils.createTimeUuid();
    return persistence.createItem(command);
};

var hydrationTargets = [
    { entityType: 'activity', entityIdField: 'activityId', hydratedField: 'activity'}
];

var entityResolver = {
    activity: function (ids) {
        return activityService.getActivityByIds(ids);
    }
};

exports.listNotifications = function (command) {
    var monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    var schema = {
        recipientId: Joi.string().guid().required(),
        since: Joi.date().default(monthAgo),
        hydrate: Joi.boolean()
    };
    service.validateListCommand(command, schema, {userContextRequired: false});
    var hydrate = command.hydrate;
    delete command.hydrate;
    return persistence.listItems(command).then(function (res) {
        if(!hydrate) return res;
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};