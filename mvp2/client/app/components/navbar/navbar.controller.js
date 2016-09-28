'use strict';

(function () {

    angular.module('ssNg')
        .controller('NavbarController', ['Auth', 'staffService', '$window', 'notificationService', NavbarController]);

    function NavbarController(Auth, staffService, $window, notificationService) {

        var that = this;

        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;

        this.getUnreadCount = function(){
            return notificationService.getUnread().length;
        };

        this.menu = [];

        this.signOut = function () {
            Auth.logout();
        };

        this.hasStaff = function () {
            if (!Auth.getCurrentUser().staff) return false;
            return Auth.getCurrentUser().staff.length > 0
        };

        this.getStaffMember = staffService.getCurrentStaffMember;

        this.openMemberSelector = staffService.openMemberSelector;

        this.signIn = function () {
            $window.location.href = '/auth/google';
        }
    }

})();
