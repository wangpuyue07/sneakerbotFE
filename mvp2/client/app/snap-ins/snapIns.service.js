'use strict';

(function () {

    angular.module('ssNg.snapIns').factory('snapInService', ['apiRoot', '$http', '$window', '$rootScope', '$q', SnapInService]);

    function SnapInService(apiRoot, $http, $window, $rootScope, $q) {
        var root = apiRoot + '/destinations/';
        return {
            add : function(name){
                $window.location.href = root + 'add/' + name;
            }
        }
    }

})();
