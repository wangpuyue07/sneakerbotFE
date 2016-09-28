'use strict';

angular.module('ssNg')
    .directive('comments', function () {
        return {
            restrict: 'E',
            scope:  {},
            controller: 'CommentsController',
            controllerAs: 'vm',
            bindToController: {
                objectId : '=',
                objectType : '=',
                recipientId : '='
            },
            templateUrl: 'components/feeds/comments.html'
        }
    });