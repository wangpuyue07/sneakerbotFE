'use strict';

angular.module('ssNg.stores')
  .config(function($stateProvider) {
    $stateProvider
      .state('stores', {
        url: '/stores',
        templateUrl: 'stores/stores.html',
        controller: 'StoresController',
        controllerAs: 'vm',
        authenticate: true,
          parent: 'main'
    })
  });
