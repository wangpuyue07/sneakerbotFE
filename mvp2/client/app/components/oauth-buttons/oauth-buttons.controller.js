'use strict';

angular.module('ssNg')
    .controller('OauthButtonsCtrl', ['$window', function ($window) {
        this.loginOauth = function (provider) {
            sessionStorage.clear();
            $window.location.href = '/auth/' + provider;
        };
    }]);
