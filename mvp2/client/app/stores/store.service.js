'use strict';

(function () {

    angular.module('ssNg.stores').factory('storeService', ['apiRoot', '$http', '$window', '$rootScope', '$q', StoreService]);

    function StoreService(apiRoot, $http, $window, $rootScope, $q) {
        var root = apiRoot + '/stores/';
        return {
            listStores : function(command){
                return $http({ url : root, method: 'GET', params : {organisationId : command.organisationId }}).then(function(res){
                   return res.data;
                })
            },
            createStore : function(command){
                return $http({ url : root, method: 'POST', data : command }).then(function(res){
                    return res.data;
                })
            },
            updateStore : function(command){
                return $http({ url : root + command.id, method: 'PUT', data : command }).then(function(res){
                    return res.data;
                })
            },
            getShortName : function(store){
                if(!store || !store.names) return null;
                var map = {
                    wellington : 'WGN',
                    newmarket : 'NMT',
                    headquarters : 'HQ',
                    losangeles: 'LA',
                    melbourne: 'MEL',
                    seekstock : 'HQ'
                };
                var text = store.names[0].text.toLowerCase();
                return map[text] || text;
            }
        }
    }

})();
