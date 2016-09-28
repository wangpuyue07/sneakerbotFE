'use strict';

(function () {

    angular.module('ssNg.insights').factory('insightService', ['apiRoot', '$http', '$window', '$rootScope', '$q', 'Auth', InsightService]);

    function InsightService(apiRoot, $http, $window, $rootScope, $q, Auth) {
        var root = apiRoot + '/insights/';
        return {
            getTopStaff: function () {
                return $http({url: root + 'top-staff', method: 'GET'}).then(function (res) {
                    return res.data;
                });
            },
            getTopStores: function () {
                return $http({url: root + 'top-stores', method: 'GET'}).then(function (res) {
                    return res.data;
                });
            },
            getTopLineStats: function () {
                return {};
                // return $http({ url : root + sku, method: 'GET'}).then(function(res){
                //     return res.data;
                // })
            }
        }
    }

})();
