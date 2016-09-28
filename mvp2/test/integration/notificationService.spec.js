var utils = require('../../lib/application/genUtils');
var notificationService = require('../../lib/notificationService');
var sql = require('../../lib/application/providers/sqlClient');
var constants = require('../../lib/constants');
var assert = require('assert');
var stubs = require('./../stubs');

describe('notificationService', () => {

    afterEach(function (done) {
        Promise.all([
            sql.models.notifications.destroy({truncate: true})
        ]).then(() => { done(); });
    });

    var notificationStub = {
        recipientId: '02c4234d-2a31-4153-9805-ac4c1cd9ca00',
        activityId: '02c4234d-2a31-4153-9805-ac4c1cd9ca01',
        notificationType : constants.actions.commented
    };

    it('Should Create, mark as read, list notifications', function (done) {
        var id = null;
        notificationService.createNotification(notificationStub).then(res => {
            assert(res.id);
            id = res.id;
            return notificationService.listNotifications({recipientId: notificationStub.recipientId, _userContext: stubs.userContext});
        }).then(res => {
            assert.equal(res[0].read, false);
            return notificationService.markAsRead({notificationIds : [id], _userContext: stubs.userContext });
        }).then(res => {
            return notificationService.listNotifications({recipientId: notificationStub.recipientId, _userContext: stubs.userContext});
        }).then(res => {
            assert.equal(res[0].read, true);
            assert.equal(res.length, 1);
            done();
        }).catch(function (e) {
            done(e)
        });
    });

});


