var events = require('../application/eventBroker');
var Persistence = require('../application/persistence');
var constants = require('../constants');
var persistence = new Persistence(constants.entityTypes.request);
var activityService = require('../activity/activityService');

events.on(persistence.events.onCreated, function (data) {
    activityService.createActivityWithContextAsSubject({
        _userContext : data.context,
        recipientId: data.current.sku,
        bodyId : data.id,
        bodyType : constants.entityTypes.request,
        objectId : data.current.sku,
        objectType : constants.entityTypes.product,
        action: constants.actions.createdStaffRequest,
        storeId : data.context.id,
        tags: data.current.tags
    });
});
