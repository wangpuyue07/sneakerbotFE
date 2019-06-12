'use strict';

(function () {
    angular.module('ssNg').directive('skuSelector', SkuSelector);
    function SkuSelector() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {
                feedback: '=',
                variations: '=',
                requestfeedback: '='
            },
            templateUrl: 'components/skuSelector/skuSelector.html',
            controller: ['$scope', function ($scope) {
                var vm = this;

                vm.allSkus = true;

                if (vm.feedback) {

                    $scope.$watch('vm.allSkus', function () {
                        if (vm.allSkus) vm.feedback.appliesTo = [];
                    });

                    vm.feedback.appliesTo = vm.feedback.appliesTo || [];

                    vm.isSelected = function (tag) {
                        return vm.feedback.appliesTo.indexOf(tag) > -1;
                    };

                    vm.areSelected = function (tag1, tag2) {
                        return vm.isSelected(tag1) || vm.isSelected(tag2);
                    };

                    vm.toggle = function (attribute, tag) {
                        var indexOf = vm.feedback.appliesTo.indexOf(tag);
                        if (indexOf > -1) {
                            vm.feedback.appliesTo.splice(indexOf, 1);
                        } else {
                            vm.feedback.appliesTo.push(tag);
                        }
                    }
                }
                if(vm.requestfeedback){
                    $scope.$watch('vm.allSkus', function () {
                        if (vm.allSkus) vm.requestfeedback.appliesTo = [];
                    });

                    vm.requestfeedback.appliesTo = vm.requestfeedback.appliesTo || [];

                    vm.isSelected = function (tag) {
                        return vm.requestfeedback.appliesTo.indexOf(tag) > -1;
                    };

                    vm.areSelected = function (tag1, tag2) {
                        return vm.isSelected(tag1) || vm.isSelected(tag2);
                    };

                    vm.toggle = function (attribute, tag) {
                        var indexOf = vm.requestfeedback.appliesTo.indexOf(tag);
                        if (indexOf > -1) {
                            vm.requestfeedback.appliesTo.splice(indexOf, 1);
                        } else {
                            vm.requestfeedback.appliesTo.push(tag);
                        }

                    }
                }
            }]
        }
    }
})();