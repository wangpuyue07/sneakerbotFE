angular.module('ssNg.search').directive('searchBox', ['$http', '_', '$location', 'searchService',  function ($http, _, $location, searchService) {

    return {
        restrict: 'E',
        templateUrl: 'search/searchBox.html',
        scope: {
            selectedEvent: '=',
            placeHolder: '=?',
            hideButton: '=?',
            cssClass: '=?',
            categories: '=?',
            includeExternalPlaces: '=?'
        },
        controller: ['$scope', '$rootScope', '$state', function ($scope, $rootScope, $state) {

            $scope.placeHolder = $scope.placeHolder || 'enter product or description to start...';

            $scope.aid = null;

            $scope.scount = 0;

            $scope.searchTerm = $location.search().term;

            $scope.$watch('searchTerm', function(newVal, oldVal) {
                var isResultsPageAndSearchCleared = oldVal && !newVal && $state.current.name === 'search-results';
                if(isResultsPageAndSearchCleared){
                    return $state.go('news');
                }
                if(!newVal) return;
                searchService.search(newVal);
                $state.go('search-results');
                $location.search({ term : newVal});
            });
        }]
    }
}]);

