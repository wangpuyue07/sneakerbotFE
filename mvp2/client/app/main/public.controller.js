'use strict';
(function () {

    angular.module('ssNg').controller('PublicController', ['$http', 'featureService', PublicController]);

    function PublicController($http, featureService) {
        var vm = this;
        vm.$http = $http;
        vm.isEnabled = featureService.isEnabled;
    }

})();
