angular.module('ssNg').factory('intercomService', ['$window', function ($window) {
    return {
        setStaffMember: function (staffName, staffId, staffCreated) {
            $window.Intercom('shutdown');
            $window.Intercom('boot', {
                app_id: "bcv39bcj",
                name: staffName,
                user_id: staffId,
                created_at: new Date(staffCreated).getTime() / 1000
            });
        }
    }
}]);