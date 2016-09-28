'use strict';

(function () {

    angular.module('ssNg.requestFeedback').factory('requestFeedbackService', ['apiRoot', '$http', '$uibModal', FeedbackService]);

    function FeedbackService(apiRoot, $http, $uibModal) {
        var root = apiRoot + '/requestFeedback/';
        return {
            tags : ['price','fit', 'style', 'size', 'colour', 'quality'],
            createRequestFeedback : function(command){
                return $http({ url : root, method: 'POST', data: command}).then(function(res){
                   return res.data;
                })
            },
            openRequestFeedback : function(product){
                $uibModal.open({
                    templateUrl : 'requestFeedback/requestFeedbackForm.html',
                    controller: 'requestFeedbackFormController',
                    controllerAs: 'vm',
                    resolve : {
                        product : product
                    }
                });
            }
        }
    }

})();
