'use strict';

(function () {

    angular.module('ssNg.notifications').factory('notificationService', ['apiRoot', '$http', '_', '$rootScope','staffService', 'messaging', '$timeout', NotificationService]);

    function NotificationService(apiRoot, $http, _, $rootScope, staffService, messaging, $timeout) {
        var root = apiRoot + '/notifications/';

        var unread = [];

        var notifications = [];

        function unsubscribe(id) {
            //  messaging.client.unsubscribe({
            //     channel : messaging.getChannelKey('notification', 'created', id)
            // });
        }

        function subscribe() {
            //var channelKey = messaging.getChannelKey('notification', 'created', staffService.getCurrentStaffMember().id);
            //console.log('CHANNEL KEY', channelKey);
            // messaging.client.subscribe({
            //     channel: channelKey,
            //     message: function (message, envelope, channelOrGroup, time, channel) {
            //         $rootScope.$apply(unread.unshift(message));
            //         $rootScope.$apply(notifications.unshift(message));
            //     }
            // });
        }

        var service = {
            getNotifications : function () {
                return notifications;
            },
            getUnread : function(){
                return unread || []
            },
            getLatest: function (staffId) {
                return $http({url: root + staffId, method: 'GET', params: { hydrate : true }}).then(function (res) {
                    var notifications = res.data;
                    unread = _.filter(notifications, ['read', false]);
                    return notifications;
                })
            },
            markAsRead: function () {
                return $http({
                    url: root + 'mark-as-read', method: 'PUT',
                    data: {notificationIds: _.map(unread, 'id')}
                }).then(function (res) {
                    $timeout(function(){
                        _.forEach(notifications, function (x) {
                            x.read = true;
                        });
                        unread = [];
                    }, 3000);
                })
            }
        };

        function loadNotifications() {
            service.getLatest(staffService.getCurrentStaffMember().id).then(function (res) {
                notifications = res;
            });
        }
        loadNotifications();

        $rootScope.$on('ss:staffMemberChanged', function(event, data){
            if(data.previous && data.previous.id) unsubscribe(data.previous.id);
            subscribe(data.current.id);
            loadNotifications()
        });

        return service;
    }

})();
