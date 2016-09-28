'use strict';

(function () {
    angular.module('ssNg').directive('mention', Mention);
    function Mention() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {
                isSubject : '=',
                staffMember : '='
            },
            templateUrl: 'components/feeds/mention.html',
            controller : [function(){
                var vm = this;
            }]
        }
    }
})();