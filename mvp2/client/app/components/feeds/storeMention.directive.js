'use strict';

(function () {
    angular.module('ssNg').directive('storeMention', Mention);
    function Mention() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {
                store : '='
            },
            template: '<span class="store-mention">{{ vm.getShortName(vm.store) }}</span>',
            controller : ['storeService', function(storeService){
                var vm = this;
                vm.getShortName = storeService.getShortName;
            }]
        }
    }
})();