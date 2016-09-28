var events = require('../application/eventBroker');
var Persistence = require('../application/persistence');
var constants = require('../constants');
var persistence = new Persistence(constants.entityTypes.feedback);
var activityService = require('../activity/activityService');

events.on(persistence.events.onCreated, function (data) {
    activityService.createActivityWithContextAsSubject({
        _userContext : data.context,
        recipientId: data.current.sku,
        bodyId : data.id,
        bodyType : constants.entityTypes.feedback,
        objectId : data.current.sku,
        objectType : constants.entityTypes.product,
        action: constants.actions.createdStaffFeedback,
        storeId : data.context.id,
        tags: data.current.tags
    });
});
