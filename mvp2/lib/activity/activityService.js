var service = require('./../application/serviceUtils');
var sql = require('../application/providers/sqlClient');
var Persistence = require('../application/persistence');
var constants = require('./../constants');
var spotService = require('../spots/spotService');
var productService = require('../productService');
var feedbackService = require('../feedbackService');
var requestService = require('../requestService');
var commentService = require('../activity/commentService');

var persistence = new Persistence(constants.entityTypes.activity);
var objects = require('../objects');
var S = require('string');
var Joi = require('joi');
var _ = require('lodash');
var util = require('util');
var async = require('async');

exports.getActivity = function (command) {
    var schema = {
        id: Joi.string().guid().required()
    };
    service.validateSync(command, schema);
    return persistence.getItem({id: command.id});
};

exports.deleteActivity = function (command) {
    var schema = {
        id: Joi.string().guid().required()
    };
    service.validateSync(command, schema);
    return persistence.deleteItem(command)
};

exports.createActivityWithContextAsSubject = function (command) {
    var schema = {
        _userContext: Joi.object().required(),
        recipientId: Joi.string(),
        parentActivityId: Joi.string().guid(),
        objectId: Joi.string().required(),
        objectType: Joi.string().required(),
        action: Joi.string().required(),
        body: Joi.string(),
        bodyId: Joi.string(),
        bodyType: Joi.string(),
        cid: Joi.string(),
        comment: Joi.string(),
        storeId: Joi.string().required(),
        tags: Joi.array().items(Joi.string().required()),
        mentions: Joi.array().items(Joi.string().guid()),
    };
    service.validateSync(command, schema);
    command.subjectId = command._userContext.staffId;
    command.subjectType = constants.entityTypes.staff;
    return exports.createActivity(command);
};

exports.likeActivity = function (command) {
    var schema = {
        id: Joi.string().guid().required()
    };
    service.validateSync(command, schema);
    var query = null;
    return persistence.getItem({id: command.id}).then(item => {
        var index = item.likes.indexOf(command._userContext.staffId);
        if (index > -1) {
            item.likes.splice(index, 1);
        } else {
            item.likes.push(command._userContext.staffId);
        }
        return persistence.updateItem({id: item.id, likes: item.likes});
    });
};

/**
 * Internal method. Should be called by higher level create`ActivityType`.
 * @param command
 * @param command.bodyType usually the thing being created e.g. staff (subject) created (predicate) feedback (body) on blue jeans (object)
 * @param options
 * @param options.disableEvent {Boolean} Turn off raising event.
 * @returns {*}
 */
exports.createActivity = function (command, options) {
    var schema = {
        parentActivityId: Joi.string().guid(),
        recipientId: Joi.string(),
        subjectId: Joi.string().required(),
        subjectType: Joi.string().required(),
        objectId: Joi.string().required(),
        objectType: Joi.string().required(),
        subObjectId: Joi.string(),
        subObjectType: Joi.allow(Object.keys(constants.entityTypes)),
        action: Joi.string().required(),
        body: Joi.string(),
        bodyId: Joi.string(),
        bodyType: Joi.string().when('bodyId', {is: Joi.string(), then: Joi.required()}),
        comment: Joi.string(),
        imageUrl: Joi.string().regex(constants.regex.url),
        cid: Joi.string(),
        storeId: Joi.string().required(),
        tags: Joi.array().items(Joi.string().required()),
        mentions: Joi.array().items(Joi.string().guid())
    };
    if (command.action === constants.actions.commented) {
        schema.comment.required();
        command.comment = S(command.comment).stripTags().s;
    }
    service.validateSync(command, schema);
    command.id = command.id || service.createTimeUuid();
    return persistence.createItem(command, options);
    //return incrementFellowship(command);
};

/**
 * Internal method. Should be called by higher level create`ActivityType`.
 * @param command
 * @returns {*}
 */
exports.updateActivity = function (command) {
    if (command.externalId !== undefined) command.externalId = command.externalId.toString();
    var schema = {
        id: Joi.string().guid().required(),
        externalUrl: Joi.string().regex(constants.regex.url).allow(null),
        externalId: Joi.string(),
        comment: Joi.string()
    };
    service.validateSync(command, schema);
    return persistence.updateItem(command);
};

exports.deleteActivities = function (command) {
    var schema = {
        cid: Joi.string().guid().required()
    };
    service.validateSync(command, schema);
    return sql.db.query(util.format("update activities set deleted = 1 where cid = '%s'", command.cid));
};

exports.listActivitiesPlain = function (command) {
    var schema = {
        cid: Joi.string().guid(),
        objectId: Joi.alternatives().try(Joi.number(), Joi.string()),
        objectType: Joi.string()
    };
    service.validateListCommand(command, schema);
    return persistence.listItems(command);
};


/**
 * Internal method.
 * @param command
 * @returns {*}
 */
exports.listActivities = function (command) {
    return persistence.listItems(command).then(activities => {
        return spotService.getSpotsById(activities.map(x => {
            return x.creatorId
        })).then(persons => {
            activities = activities.map(activity => {
                activity.person_S = objects.person_XS(_.find(persons, 'id', activity.creatorId));
                return activity;
            });
            return mapHierarchy(activities);
        })
    });
};


var hydrationTargets = [
    {entityTypeField: 'subjectType', entityIdField: 'subjectId', hydratedField: 'subject'},
    {entityTypeField: 'objectType', entityIdField: 'objectId', hydratedField: 'object'},
    {entityTypeField: 'bodyType', entityIdField: 'bodyId', hydratedField: 'body'},
    {entityType: 'spot', entityIdField: 'storeId', hydratedField: 'store'},
];

var entityResolver = {
    staff: function (ids) {
        return spotService.getSpotsById(ids);
    },
    spot: function (ids) {
        return spotService.getSpotsById(ids);
    },
    person: function (ids) {
        return spotService.getSpotsById(ids);
    },
    image: function (ids) {
        return new Promise(function (resolve) {
            resolve(ids);
        });
    },
    feedback: function (ids) {
        return feedbackService.getFeedbackById(ids);
    },
    request: function (ids) {
        return requestService.getRequestById(ids);
    },
    product: function (ids) {
        return productService.getProductById(ids).then(products => {
            return products.map(p => {
                p.id = p.sku;
                return p;
            })
        })
    }
};

exports.hydrateSingleActivity = function (activity) {
    return service.hydrateList([activity], hydrationTargets, entityResolver).then(function (res) {
        return res[0];
    })
};

exports.getLatest = function (command) {
    var monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    if (command.tags && !Array.isArray(command.tags)) {
        command.tags = [command.tags];
    }
    var rules = {
        action: Joi.object(),
        recipientId: Joi.string(),
        objectId: Joi.string(),
        since: Joi.date().default(monthAgo),
        limit: Joi.number().default(50),
        entityResolver: Joi.object(),
        tags: Joi.array(Joi.string()),
        storeId: Joi.string(),
        direction : Joi.string()
    };
    command = service.validateSync(command, rules);
    var listCommand = {limit: command.limit, _userContext: command._userContext};
    listCommand = service.validateListCommand(listCommand);
    listCommand.createdAt = {gt: command.since};
    if (command.storeId) listCommand.storeId = command.storeId;
    if (command.recipientId) listCommand.recipientId = command.recipientId;
    if (command.objectId) listCommand.objectId = command.objectId;
    if (command.direction) listCommand.direction = command.direction;
    if (command.tags && command.tags.length > 0) {
        listCommand.tags = {
            $and: command.tags.map(tag => {
                return {$like: '%|' + tag + '|%'};
            })
        };
    }
    if(command.action) listCommand.action = command.action;

    return persistence.listItems(listCommand).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};

exports.getActivityByIds = function(ids){
    return persistence.listItems({ id : {$in : ids }}).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};


/**
 * For hierarchical activities (e.g. comments) This will create the nesting.
 * @param activities
 * @returns {*}
 */
function mapHierarchy(activities) {
    var parents = activities.filter(x => {
        return !x.parentActivityId;
    });
    return parents.map(parent => {
        parent.replies = activities.filter(child => {
                return child.parentActivityId === parent.id;
            }) || [];
        return parent;
    })
}