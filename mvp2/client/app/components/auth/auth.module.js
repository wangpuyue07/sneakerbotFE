'use strict';

angular.module('ssNg.auth', [
  'ssNg.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
