'use strict';

(function () {

    angular.module('ssNg.profiles').factory('profileService', ['apiRoot', '$http', '$window', '$rootScope', '$q', 'Auth', ProfileService]);

    function ProfileService(apiRoot, $http, $window, $rootScope, $q, Auth) {
        var root = apiRoot + '/profiles/';
        return {
            uploadImage : function(command){
                return $http({ url : root, method: 'POST', data: command}).then(function(res){
                   return res.data;
                })
            }
        }
    }

})();
