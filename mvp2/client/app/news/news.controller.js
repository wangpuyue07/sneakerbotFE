'use strict';

(function () {

    angular.module('ssNg.news').controller('NewsController',
        ['Auth', '$window', 'messaging', '$scope', 'newsService', 'staffService', '$stateParams', '$state', '_', 'storeService', 'feedbackService', NewsController]);


    function NewsController(Auth, $window, messaging, $scope, newsService, staffService, $stateParams, $state,_, storeService, feedbackService) {


        var vm = this;

        vm.activities = [];

        vm.firstLoad = false;

        vm.stateParams = $stateParams;

        vm.staffMember = staffService.getCurrentStaffMember;

        vm.getShortName = storeService.getShortName;

        vm.tags = feedbackService.tags;

        Auth.getStoreAsync().then(function (res) {
            vm.stores = res.stores;
            vm.stores.unshift({names: [{text: 'All Stores'}], id: null});
        });

        vm.currentStore = null;

        vm.currentTags = [];

        vm.toggleCategory = function toggleCategory(category) {
            var index = vm.currentTags.indexOf(category);
            if (index > -1) {
                vm.currentTags.splice(index, 1);
            } else {
                vm.currentTags.push(category);
            }
            vm.update();
        };

        vm.params = {};

        vm.isCompletelyEmpty = function () {
            return Object.keys(vm.params.tags).length === 0 && !vm.params.store;
        };

        vm.update = function () {
            vm.params = {storeId: vm.currentStore ? vm.currentStore.id : null, tags: vm.currentTags};
            newsService.getLatest(vm.params).then(function (res) {
                vm.activities = res;
                vm.firstLoad = true;
            });
        };

        vm.status = {
            isCustomHeaderOpen: false,
            isFirstOpen: true,
            isFirstDisabled: false
        };
        vm.openFeedback = feedbackService.openFeedback;

        vm.update();


        // messaging.client.subscribe({
        //     channel: messaging.getChannelKey('activity', 'created'),
        //     message: function (message, envelope, channelOrGroup, time, channel) {
        //         if(staffService.getCurrentStaffMember().id == message.subject.id) return;
        //         $scope.$apply(vm.activities.unshift(message));
        //     }
        // });
        //
        // messaging.client.subscribe({
        //     channel: messaging.getChannelKey('activity', 'updated'),
        //     message: function (message, envelope, channelOrGroup, time, channel) {
        //         var activity = _.find(vm.activities, ['id', message.id]);
        //         if (!activity) return console.log('cant find message');
        //         $scope.$apply(angular.copy(message, activity));
        //     }
        // });
    }
})();
