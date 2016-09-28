angular.module('ssNg').factory('featureService', ['Auth', '$location', function (Auth, $location) {

    function FeatureService(){
    }

    var featuresByHost = {
        'feature_signin_classic' : [ 'test.seekstock.nz', 'seekstock.nz', 'hallensteins.seekstock.nz', '192.168.1.102', 'localhost'],
        'feature_signin_oauth' : ['test.seekstock.nz', 'localhost'],
        'feature_analytics' : ['seekstock.nz', 'hallensteins.seekstock.nz']
    };

    /**
     * @param feature request|feedback
     * @returns {*}
     */
    FeatureService.prototype.isEnabled  = function(feature){
        if(featuresByHost[feature]){
            var host = $location.host();
            return featuresByHost[feature].indexOf(host) > -1;
        }
        var store = Auth.getCurrentUser();
        if(!store) return false;
        return !!store.organisation['feature_' + feature];
    };

    return new FeatureService();

}]);