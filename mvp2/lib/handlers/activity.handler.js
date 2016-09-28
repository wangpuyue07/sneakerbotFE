var events = require('../application/eventBroker');
var Persistence = require('../application/persistence');
var constants = require('../constants');
var persistence = new Persistence(constants.entityTypes.activity);
var activityService = require('../activity/activityService');
var notificationService = require('../notificationService');
var config = require('../../config');
var util = require('util');
var _ = require('lodash');
var notificationRules = require('../notificationRules');

var pubnub = require("pubnub")({
    ssl: true,
    publish_key: 'pub-c-ed23c350-cc86-4df5-88e4-32b3612ff342',
    subscribe_key: 'sub-c-0777862a-17ea-11e6-b700-0619f8945a4f'
});

events.on(persistence.events.onCreated, function (data) {

    activityService.hydrateSingleActivity(data.current).then(hydrated => {
        var recipientHeaders = notificationRules.getRecipientHeaders(hydrated);
        recipientHeaders.forEach((value, key, map) => {
            notificationService.createNotification(
                {recipientId: value.recipientId, activityId: value.activityId, notificationType: value.type});
            //
            // var channelKey = getChannelKey(constants.entityTypes.notification, 'created', hydrated.object.staffId);
            // console.log('CHANNEL KEY', channelKey);
            // pubnub.publish({
            //     channel: channelKey,
            //     message: hydrated,
            //     callback: publishCallback,
            //     error: publishErrorCallback
            // });
            // pubnub.publish({
            //     channel: getChannelKey(constants.entityTypes.activity, 'created'),
            //     message: hydrated,
            //     callback: publishCallback,
            //     error: publishErrorCallback
            // });

        });
    })
});


events.on(persistence.events.onUpdated, function (data) {
    activityService.hydrateSingleActivity(data.current).then(hydrated => {
        var likerId = _.difference(data.current.likes, data.previous.likes)[0];
        if(likerId) {
            notificationService.createNotification(
                {recipientId: hydrated.body.staffId, activityId: hydrated.id, notificationType: constants.notificationType.liked });
        }
    });

    // var channelKey = getChannelKey(constants.entityTypes.notification, 'created', data.current.subjectId);
    // console.log('CHANNEL KEY', channelKey);
    // pubnub.publish({
    //     channel: channelKey,
    //     message: hydratedLike,
    //     callback: publishCallback,
    //     error: publishErrorCallback
    // });

    // activityService.hydrateSingleActivity(data.current).then(hydrated => {
    //     pubnub.publish({
    //         channel: getChannelKey(constants.entityTypes.activity, 'updated'),
    //         message: hydrated,
    //         callback: publishCallback,
    //         error: publishErrorCallback
    //     });
    // })
});


function publishCallback(e) {
    console.log("SUCCESS!", e);
}

function publishErrorCallback(e) {
    console.log("FAILED! RETRY PUBLISH!", e);
}


/**
 *
 * @param entityType
 * @param eventName created|updated|deleted
 * @param [recipientId]
 */
function getChannelKey(entityType, eventName, recipientId) {
    var key = util.format('channel:%s:%s:%s', config.host, entityType, eventName);
    if (recipientId) key += ':' + recipientId;
    return key;
}
