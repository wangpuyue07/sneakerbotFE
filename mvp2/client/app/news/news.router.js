'use strict';

angular.module('ssNg.news')
  .config(function($stateProvider) {

      $stateProvider
          .state('news', {
              url: '/',
              params: {
                  store: null,
                  tag: null
              },
              templateUrl: 'news/news.html',
              controller: 'NewsController',
              controllerAs: 'vm',
              authenticate: true,
              parent: 'main'
          })
  });
