var notificationRules = require('../../lib/notificationRules');
var constants = require('../../lib/constants');
var assert = require('assert');
var stubs = require('../stubs');


describe('notificationRules', () => {

    /*
         Notification Rules
         1. Should go to the creator of the content when someone adds content it. (subjectId)
         2. Should go to the person mentioned with reference to the discussion.
         3. Should not go to the the originator of the content
         4. If you are mentioned in a post this should be more important than being the creator of a post
         //commented, liked, mentioned
     */

    it('When an object has activity created against it the object creator should receive a notification', () => {
        // e.g. Alex commented on your post
        var activity = stubs.getHydratedActivity();
        var headers = notificationRules.getRecipientHeaders(activity);
        assert.equal(headers.size, 1);
        assert.equal(headers.get(activity.object.staffId).type, constants.actions.commented);
        assert(headers.has(activity.object.staffId));
    });

    it('When an object has activity where the subject is the object creator he should not receive a notification', () => {
        // e.g. Alex commented on your post
        var activity = stubs.getHydratedActivity();
        activity.object.staffId = activity.subjectId;
        var headers = notificationRules.getRecipientHeaders(activity);
        assert.equal(headers.size, 0);
        assert(!headers.has(activity.subjectId));
    });

    it('When a staff member is mentioned they should receive a notification', () => {
        // e.g. Alex mentioned you in a post
        var activity = stubs.getHydratedActivity();
        activity.mentions = ['5a4fa566-f535-4138-b6be-a35d20bb2222'];
        var headers = notificationRules.getRecipientHeaders(activity);
        assert.equal(headers.get(activity.object.staffId).type, constants.actions.commented);
        assert.equal(headers.size, 2);
        assert(headers.has(activity.mentions[0]));
    });

    it('When a staff member mentions themself they should not receive a notificaiton.', () => {
        // e.g. Alex mentioned you in a post
        var activity = stubs.getHydratedActivity();
        activity.mentions = [activity.subjectId];
        var headers = notificationRules.getRecipientHeaders(activity);
        assert.equal(headers.size, 1);
        assert.equal(headers.get(activity.object.staffId).type, constants.actions.commented);
        assert(!headers.has(activity.mentions[0]));
    });

    it('When an object has activity created against it the object creator should only receive notification even if they are mentioned', () => {
        // e.g. Alex mentioned you
        var activity = stubs.getHydratedActivity();
        activity.mentions = [activity.object.staffId];
        var headers = notificationRules.getRecipientHeaders(activity);
        assert.equal(headers.size, 1);
        assert(headers.has(activity.mentions[0]));
        assert.equal(headers.get(activity.mentions[0]).type, constants.notificationType.mentioned);
    });

});