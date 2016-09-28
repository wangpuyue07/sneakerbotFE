'use strict';

(function () {

    angular.module('ssNg.search').factory('searchService', ['algolia', '$window', '$rootScope', 'Auth', SearchService]);

    function SearchService(algolia, $window, $rootScope, Auth) {

        var client = algolia.Client("M96FY1SE39", '0f7f4674e053a9d6fe0c5fdd8c7b30f4');
        var index = null;

        Auth.getStoreAsync().then(function(res){
            index = client.initIndex(res.organisation.productSearchIndex);
        });

        return {
            results : [],
            search : function(term){
                var that = this;
                if(!term) {
                    return that.results = [];
                }
                index.search(term).then(function searchSuccess(content) {
                       that.results =  content.hits;
                    }, function searchFailure(err) {
                        console.log(err);
                });
            }
        }
    }

})();
