angular.module('ssNg').factory('imageService', ['Auth', function (Auth) {

    var productUrlPrefix = null;

    function ImageService(){
        Auth.getStoreAsync().then(function(res){
            productUrlPrefix = res.organisation.productUrlPrefix;
        })
    }

    /**
     * @param image
     * @returns {*}
     */
    ImageService.prototype.getUrl  = function(image){
        if(!productUrlPrefix) return null;
        return productUrlPrefix + image;
    };

    return new ImageService();

}]);