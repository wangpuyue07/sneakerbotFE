'use strict';

(function () {

    angular.module('ssNg.profiles').factory('newsService', ['apiRoot', '$http', '_', NewsService]);

    function NewsService(apiRoot, $http, _) {
        var root = apiRoot + '/news/';

        //on message receipt, put it into the current bucket(s) check if its been read (news.getUnread())
        //when that bucket is viewed zero out the unread posts after n seconds (news.setRead(activityIds)
        //send a message to the server with what has been read (news.setRead(activityIds))
        //items with an unread state will have a special class
        var unread = {};

        function incrementUnread(activities) {
            _.forEach(activities, function (activity) {
                for (var store in unread.stores) {
                    if (!unread.stores.hasOwnProperty(store)) continue;
                    if (store === activity.store.toLowerCase() && !activity.read) unread.stores[store]++;
                }
                for (var tag in unread.tags) {
                    if (!unread.tags.hasOwnProperty(tag)) continue;
                    if (activity.tags.indexOf(tag) > -1 && !activity.read) unread.tags[tag]++;
                }
            });
        }

        return {
            like: function (activityId) {
                return $http({url: root + activityId + '/like', method: 'PUT'}).then(function (res) {
                    return res.data;
                })
            },
            getLatest: function (command) {
                var that = this;
                return $http({url: root, method: 'GET', params: command}).then(function (res) {
                    return res.data;
                })
            },
            markAsRead: function (activities) {
                return $http({url: root + 'mark-as-read', method: 'PUT', data: {activityIds: _.map(activities, 'id')}}).then(function (res) {
                    _.forEach(activities, function (x) {
                        x.read = true;
                    });
                    return activities;
                })
            },
            getUnreadCounts: function () {
                return unread;
            },
            // reloadUnread: function () {
            //     return $http({url: root + 'unread-counts', method: 'GET'}).then(function (res) {
            //         unread = res.data;
            //     });
            // },
            incrementUnread: incrementUnread
        }
    }

})();
