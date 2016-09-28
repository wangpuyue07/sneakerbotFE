'use strict';

(function () {

    angular.module('ssNg.products').factory('productService', ['apiRoot', '$http', '$window', '$rootScope', '$q', 'Auth', ProductService]);

    function ProductService(apiRoot, $http, $window, $rootScope, $q, Auth) {
        var root = apiRoot + '/products/';

        var sizes = {
            XS : 1,
            S : 2,
            M : 3,
            L : 4,
            XL : 5,
            XXL : 6,
            XXXL : 7
        };

        return {
            getProduct: function(sku){
                return $http({ url : root + sku, method: 'GET'}).then(function(res){
                    return res.data;
                })
            },
            sortSize: function(sizeA, sizeB){
                var sizeAIsNumber = isNaN(sizeA);
                var sizeBIsNumber = isNaN(sizeB);
                if(!sizeAIsNumber && !sizeBIsNumber) return sizeA > sizeB;
                if(sizeAIsNumber || sizeBIsNumber) return true;
                return sizes[sizeA] > sizes[sizeB];
            }
        }
    }

})();
