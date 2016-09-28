'use strict';

angular.module('ssNg.products')
    .config(function($stateProvider) {
        $stateProvider
            .state('product', {
                url: '/products/:sku',
                templateUrl: 'products/product.html',
                controller: 'ProductController',
                controllerAs: 'vm',
                authenticate: true,
                parent: 'main'
            })
    });