'use strict';
(function () {

    angular.module('ssNg').controller('MainController', ['$http', 'feedbackService', 'newsService', MainController]);

    function MainController($http, feedbackService, newsService) {
        var vm = this;

        vm.$http = $http;

        vm.tags = feedbackService.tags;

        // vm.getUnread = function(command){
        //     var key = Object.keys(command)[0];
        //     var section = newsService.getUnreadCounts()[key];
        //     if(!section) return 0;
        //     return section[command[key]];
        // }
    }
})();