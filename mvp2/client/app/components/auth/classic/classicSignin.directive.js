'use strict';

(function () {
    angular.module('ssNg').directive('classicSignin', ClassicSignin);
    function ClassicSignin() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {},
            templateUrl: 'components/auth/classic/classicSignin.html',
            controller: ['Auth', '$window', function (Auth, $window) {
                var vm = this;

                vm.user = {};
                vm.errors = {};
                vm.submitted = false;

                vm.login = function (form) {
                    vm.submitted = true;
                    if (!form.$valid) return;
                    Auth.login(vm.user).then(function (res) {
                        $window.location.href = '/';
                    })
                        .catch(function (e) {
                            vm.errors.other = e.message;
                        });
                };
            }]
        }
    }
})();
