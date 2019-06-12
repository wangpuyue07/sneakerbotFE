'use strict';

(function () {


    angular.module('ssNg.search').controller('ResultsController', ['searchService', 'feedbackService', 'requestService','requestFeedbackService', 'featureService', ResultsController]);

    function ResultsController(searchService, feedbackService, requestService, requestFeedbackService, featureService) {

        var vm = this;

        vm.search = searchService;

        vm.featureService = featureService;

        vm.openFeedback = feedbackService.openFeedback;

        vm.openRequest = requestService.openRequest;
        
        vm.openRequestFeedback = requestFeedbackService.openRequestFeedback;

    }

})();
