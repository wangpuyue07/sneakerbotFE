'use strict';

angular.module('ssNg.search')
    .config(function($stateProvider) {
        $stateProvider
            .state('search-results', {
                url: '/search-results',
                templateUrl: 'search/results.html',
                controller: 'ResultsController',
                controllerAs: 'vm',
                authenticate: true,
                parent: 'main',
                reloadOnSearch: false
            })
    });