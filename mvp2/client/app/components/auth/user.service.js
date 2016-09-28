'use strict';

(function () {

    angular.module('ssNg.auth').factory('userService', ['apiRoot', '$http', UserService]);

    function UserService(apiRoot, $http) {
        var root = apiRoot + '/users/';
        return {
            getUser : function() {
                return $http({ url : root + 'me', method: 'GET' }).then(function(res){
                    return res.data;
                })
            }
        }
    }
})();
