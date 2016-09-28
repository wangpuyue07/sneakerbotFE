'use strict';
(function () {

    angular.module('ssNg.requestFeedback').controller('requestFeedbackFormController', ['$rootScope', '$state', '$location', 'requestFeedbackService', 'product', '$uibModalInstance', requestFeedbackFormController]);

    function requestFeedbackFormController($rootScope, $state, $location, requestFeedbackService, product, $uibModalInstance) {
        var vm = this;

        vm.product = product;

        vm.requestFeedback = {
            sku : product.sku,
            tags : []
        };

        vm.createRequestFeedback = function(){
            requestFeedbackService.createRequestFeedback(vm.requestFeedback).then(function(res){
                $state.go('news');
                $uibModalInstance.close();
            });
        };

        vm.tags = requestFeedbackService.tags;

        vm.toggleCategory = function toggleCategory(category) {
            var index = vm.requestFeedback.tags.indexOf(category);
            if (index > -1) return vm.requestFeedback.tags.splice(index, 1);
            vm.requestFeedback.tags.push(category);
        };
    }

})();