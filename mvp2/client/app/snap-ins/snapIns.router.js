'use strict';

angular.module('ssNg.snapIns')
    .config(function($stateProvider) {
        $stateProvider
            .state('snap-ins', {
                url: '/snap-ins',
                templateUrl: 'snap-ins/snap-ins.html',
                controller: 'SnapInsController',
                controllerAs: 'snapins',
                authenticate: true,
                parent: 'main'
            })
    });