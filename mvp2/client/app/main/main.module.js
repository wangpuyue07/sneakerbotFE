'use strict';

angular.module('ssNg')
    .config(function ($stateProvider) {
        $stateProvider
            .state('public', {
                url: '/public',
                templateUrl: 'main/public.html',
                controller: 'PublicController',
                controllerAs: 'vm'
            })
            .state('main', {
                templateUrl: 'main/main.html',
                authenticate: true,
                controller: 'MainController',
                controllerAs: 'vm'
            }).state('login', {
                url: '/login',
                templateUrl: 'main/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            }).state('weekly-report', {
            url: '/weekly-report',
            templateUrl: 'main/weeklyReport.html'
        })
        });
