'use strict';

(function () {

    angular.module('ssNg.auth').factory('Auth', ['$location', '$http', '$cookies', '$q', 'Util', 'userService', 'staffService', '$rootScope', '$state', AuthService]);

    function AuthService($location, $http, $cookies, $q, Util, userService, staffService, $rootScope, $state) {

        var currentUser = {organisation: {}};

        var cookieName = 'accessToken';

        var currentStoreKey = 'seekstock.nz:currentStoreKey';

        var Auth = {
            login: function (user) {
                return $http.post('/auth/local', {
                    email: user.email,
                    password: user.password
                })
                .then(function (res) {
                    $cookies.put(cookieName, res.data.accessToken);
                    return user;
                })
                .catch(function(e) {
                    Auth.logout();
                    if (e.status === 401) e.data = {message: 'Email or password are incorrect.'};
                    return $q.reject(e.data);
                });
            },

            logout: function () {
                $cookies.remove(cookieName);
                sessionStorage.clear();
                currentUser = {};
                $state.go('public');
            },


            getCurrentUser: function () {
                return currentUser;
            },

            getStoreAsync: function () {
                return $q(function (resolve, reject) {
                    if (currentUser.id) resolve(currentUser);
                    Auth.reLoadUser().then(function (res) {
                        resolve(res);
                    })
                });
            },

            reLoadUser: function () {
                if (!Auth.getToken()) return $q(function (resolve, reject) {
                    resolve(null);
                });
                return userService.getUser().then(function (res) {
                    currentUser = res;
                    return currentUser;
                }).catch(function (e) {
                    return {};
                })
            },

            isLoggedIn: function () {
                if (!currentUser) return false;
                return !!currentUser.id;
            },

            /**
             * Get auth token
             *
             * @return {String} - a token string used for authenticating
             */
            getToken: function () {
                return $cookies.get(cookieName);
            }
        };

        return Auth;
    }

})();
