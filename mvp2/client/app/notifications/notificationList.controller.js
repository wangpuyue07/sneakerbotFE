'use strict';
(function () {

    angular.module('ssNg.notifications').controller('NotificationListController', ['notificationService', 'storeService', '$timeout', '_', '$state', NotificationListController]);

    function NotificationListController(notificationService, storeService, $timeout, _, $state) {
        var vm = this;

        vm.getNotifications = notificationService.getNotifications;

        if($state.current.name == 'notifications') {
            notificationService.markAsRead();
        }
        vm.getShortName = storeService.getShortName;
    }

})();