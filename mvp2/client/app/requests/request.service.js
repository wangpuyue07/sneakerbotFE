'use strict';

(function () {

    angular.module('ssNg.requests').factory('requestService', ['apiRoot', '$http', '$uibModal', RequestService]);

    function RequestService(apiRoot, $http, $uibModal) {
        var root = apiRoot + '/requests/';
        return {
            tags : ['fit', 'style', 'size', 'colour', 'quality'],
            createRequest : function(command){
                return $http({ url : root, method: 'POST', data: command}).then(function(res){
                   return res.data;
                })
            },
            openRequest : function(product){
                $uibModal.open({
                    templateUrl : 'requests/requestForm.html',
                    controller: 'requestFormController',
                    controllerAs: 'vm',
                    resolve : {
                        product : product
                    }
                });
            }
        }
    }

})();
