'use strict';

(function () {
    angular.module('ssNg').directive('requestFeedbackLabels', FeedbackLabels);
    function FeedbackLabels() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {
                requestFeedback: '='
            },
            templateUrl: 'requestFeedback/requestFeedbackLabels.html',
            controller: [function () {
                var vm = this;
            }]
        }
    }
})();