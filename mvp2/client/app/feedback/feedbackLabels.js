'use strict';

(function () {
    angular.module('ssNg').directive('feedbackLabels', FeedbackLabels);
    function FeedbackLabels() {
        return {
            restrict: 'E',
            scope: {},
            controllerAs: 'vm',
            bindToController: {
                feedback: '='
            },
            templateUrl: 'feedback/feedbackLabels.html',
            controller: [function () {
                var vm = this;
            }]
        }
    }
})();