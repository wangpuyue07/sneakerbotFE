'use strict';

(function () {
    angular.module('ssNg').directive('ssImage', Image);
    function Image() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {
                src : '=',
                height : '=',
                width : '=',
                class : '=',
            },
            templateUrl: 'components/images/ssImage.html',
            controller : ['imageService', function(imageService){
                var vm = this;
                vm.getFullImageUrl = function(){
                    return vm.src ? imageService.getUrl(vm.src) : '';
                }
            }]
        }
    }
})();