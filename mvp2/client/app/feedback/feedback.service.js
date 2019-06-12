'use strict';

(function () {

    angular.module('ssNg.feedback').factory('feedbackService', ['apiRoot', '$http', '$uibModal', FeedbackService]);

    function FeedbackService(apiRoot, $http, $uibModal) {
        var root = apiRoot + '/feedback/';
        return {
            tags : ['fit', 'style', 'size', 'colour', 'quality'],
            createFeedback : function(command){
                return $http({ url : root, method: 'POST', data: command}).then(function(res){
                   return res.data;
                })
            },
            openFeedback : function(product){

                $uibModal.open({
                    templateUrl : 'feedback/feedbackForm.html',
                    controller: 'feedbackFormController',
                    controllerAs: 'vm',
                    resolve : {
                        product : product
                    }
                });
            }
        }
    }

})();
