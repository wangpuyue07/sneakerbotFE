'use strict';

angular.module('ssNg.notifications')
    .config(function($stateProvider) {
        $stateProvider
            .state('notifications', {
                url: '/notifications',
                templateUrl: 'notifications/list.html',
                controller: 'NotificationListController',
                controllerAs: 'vm',
                bindToController: true,
                authenticate: true,
                parent: 'main'
            })
    });