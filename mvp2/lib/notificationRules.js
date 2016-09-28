var constants = require('./constants');


/**
 *
 * @param activityId
 * @param recipientId
 * @param notificationType
 * @constructor
 */
var NotificationHeader = function (activityId, recipientId, notificationType) {
    this.activityId = activityId;
    this.recipientId = recipientId;
    this.type = notificationType;
};

/**
 * Returns a map of recipientId|notification header
 * @param hydratedActivity
 * @param [objectCreatorId] The original creator of the object being discussed. Defaults to activity.object.staffId;
 * @returns {Map}
 */
exports.getRecipientHeaders = function(hydratedActivity, objectCreatorId){
    objectCreatorId = objectCreatorId || hydratedActivity.object.staffId;
    var headers = new Map();
    if(!hydratedActivity.subjectId) throw new Error('subjectId cannot be empty.');

    if(objectCreatorId != hydratedActivity.subjectId) headers.set(objectCreatorId,
        new NotificationHeader(hydratedActivity.id, objectCreatorId, hydratedActivity.action));

    hydratedActivity.mentions.forEach(mentionId => {
        if(!mentionId) throw  new Error('a mention id cannot be an empty value.');
        if(hydratedActivity.subjectId != mentionId) headers.set(mentionId,
            new NotificationHeader(hydratedActivity.id, mentionId, constants.notificationType.mentioned));
    });
    return headers;
};