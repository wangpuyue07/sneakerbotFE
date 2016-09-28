'use strict';

angular.module('ssNg', [
    'ssNg.auth',
    'ssNg.stores',
    'ssNg.staff',
    'ssNg.snapIns',
    'ssNg.news',
    'ssNg.search',
    'ssNg.feedback',
    'ssNg.requests',
    'ssNg.requestFeedback',
    'ssNg.products',
    'ssNg.profiles',
    'ssNg.insights',
    'ssNg.notifications',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'angularMoment',
    'mentio'
])
    .config(['$urlRouterProvider', '$locationProvider', '$provide', function ($urlRouterProvider, $locationProvider, $provide) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
        $provide.value("apiRoot", '/api');

    }]).run(['Auth', '$state', '$location', '$rootScope', 'staffService', '$window', 'featureService', function (Auth, $state, $location, $rootScope, staffService, $window, featureService) {

    $window.ga('create', 'UA-79858809-1', 'auto');

    $rootScope.$on("$stateChangeError", console.log.bind(console));

    $rootScope.$on('$stateChangeStart', function (event, next, nextParams, current) {
        if (next.authenticate) {
            Auth.getStoreAsync().then(function (store) {
                if (!store || !store.id) {
                    $state.go('public');
                    event.preventDefault();
                } else {
                    staffService.checkMemberSelected(store);
                }
            });
        }
    });

    if (featureService.isEnabled('feature_analytics')) {
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.url());
        });
    }

}]);
