'use strict';

angular.module('ssNg.staff')
  .config(function($stateProvider) {
    $stateProvider
      .state('staff', {
        url: '/staff',
        templateUrl: 'staff/staff.html',
        controller: 'StaffController',
        controllerAs: 'staff',
        authenticate: true,
          parent: 'main'
    })
  });
