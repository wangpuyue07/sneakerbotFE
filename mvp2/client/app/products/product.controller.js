'use strict';
(function () {

    angular.module('ssNg.products').controller('ProductController', ['$state', 'productService', 'newsService', '$stateParams', 'feedbackService', 'requestService', 'featureService', '$location', ProductController]);

    function ProductController($state, productService, newsService, $stateParams, feedbackService, requestService, featureService, $location) {
        let vm = this;

        productService.getProduct($stateParams.sku).then(function (res) {
            vm.product = res;
            let query = $location.search();
            if(query.modal == 'feedback'){
                feedbackService.openFeedback(res);
            }
        });

        vm.openFeedback = feedbackService.openFeedback;
        vm.openRequest = requestService.openRequest;
        vm.featureService = featureService;

        vm.activities = [];

        vm.sortSize = productService.sortSize;

        vm.update = function () {
            vm.params = {store: vm.currentStore, tags: vm.currentTags, recipientId: $stateParams.sku};
            newsService.getLatest(vm.params).then(function (res) {
                vm.activities = res;
                vm.firstLoad = true;
            });
        };
        vm.update();
    }

})();