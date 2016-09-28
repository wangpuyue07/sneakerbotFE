'use strict';
(function () {

    angular.module('ssNg.feedback').controller('feedbackFormController', ['$rootScope', '$state', '$location', 'feedbackService', 'product', '$uibModalInstance', feedbackFormController]);

    function feedbackFormController($rootScope, $state, $location, feedbackService, product, $uibModalInstance) {
        var vm = this;

        vm.product = product;

        vm.feedback = {
            sku : product.sku,
            tags : []
        };

        vm.createFeedback = function(){
            feedbackService.createFeedback(vm.feedback).then(function(res){
                $state.go('news');
                $uibModalInstance.close();
            });
        };

        vm.tags = feedbackService.tags;

        vm.toggleCategory = function toggleCategory(category) {
            var index = vm.feedback.tags.indexOf(category);
            if (index > -1) return vm.feedback.tags.splice(index, 1);
            vm.feedback.tags.push(category);
        };
    }

})();