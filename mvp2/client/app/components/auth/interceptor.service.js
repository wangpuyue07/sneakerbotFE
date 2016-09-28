'use strict';

(function () {

    function RequestContextInterceptor($rootScope, $q, $cookies, $injector, Util) {
        var state;
        return {
            request : function(config) {
                config.headers = config.headers || {};
                var accessToken = $cookies.get('accessToken');
                var staffId = sessionStorage.getItem('staffId');
                if (Util.isSameOrigin(config.url)) {
                    if(accessToken) config.headers.Authorization = 'Bearer ' + accessToken;
                    if(staffId) config.headers['x-seekstock-staffId'] = staffId;
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if (response.status === 401) {
                    (state || (state = $injector.get('$state'))).go('public');
                    // remove any stale tokens
                    $cookies.remove('accessToken');
                }
                return $q.reject(response);
            }
        };
    }

    angular.module('ssNg.auth')
        .factory('authInterceptor', RequestContextInterceptor);

})();
