angular.module('ssNg').factory('messaging', ['$window', function ($window) {

    function Messaging(){
        // this.client = window.PUBNUB.init({
        //     ssl: true,
        //     subscribe_key: 'sub-c-0777862a-17ea-11e6-b700-0619f8945a4f',
        //     error: function (error) {
        //         console.log('Error:', error);
        //     }
        // });
    }

    /**
     * @param entityType
     * @param eventName created|updated|deleted
     * @returns {*}
     */
    Messaging.prototype.getChannelKey  = function(entityType, eventName, recipientId){
        var key = 'channel:' + getHost() + ':' + entityType + ':' + eventName;
        if(recipientId) key += ':' + recipientId;
        return key;
    };

    return new Messaging();

    function getHost(){
        return $window.location.protocol + "//" + $window.location.hostname  +
            (window.location.port ? ':' + $window.location.port : '');
    }
}]);