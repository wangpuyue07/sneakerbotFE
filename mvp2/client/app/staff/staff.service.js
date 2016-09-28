'use strict';

(function () {

    angular.module('ssNg.staff').factory('staffService', ['apiRoot', '$http', '$window', '$rootScope', '$q', '$uibModal', '$timeout', 'intercomService', '_', StaffService]);

    function StaffService(apiRoot, $http, $window, $rootScope, $q, $uibModal, $timeout, intercomService, _) {
        var root = apiRoot + '/staff/';
        var staffMemberKey = 'seekstock.nz:currentStaffMember';

        return {
            listStaff: function (command) {
                return $http({url: root, method: 'GET', params: command}).then(function (res) {
                    return res.data;
                })
            },
            createStaff: function (command) {
                return $http({url: root, method: 'POST', data: command}).then(function (res) {
                    $rootScope.$emit('bagpipes:contextChanged', res);
                    return res.data;
                })
            },
            deleteStaff: function (command) {
                return $http({url: root + '/' + command.id, method: 'DELETE'}).then(function (res) {
                    return res.data;
                })
            },
            clearCurrentStaffMember: function () {
                sessionStorage.clear();
            },
            getCurrentStaffMember: function () {
                return JSON.parse(sessionStorage.getItem(staffMemberKey)) || {};
            },
            setCurrentStaffMember: function (staff) {
                var data = { previous : this.getCurrentStaffMember(), current : staff };
                sessionStorage.setItem(staffMemberKey, JSON.stringify(staff));
                sessionStorage.setItem('staffId', staff.id);
                intercomService.setStaffMember(staff.names[0].text, staff.id, staff.createdAt);
                $rootScope.$emit('ss:staffMemberChanged', data);
            },
            openMemberSelector: function(){
                var modal = $uibModal.open({
                    templateUrl: 'main/chooseStaffMemberForm.html',
                    controller: 'ChooseStaffMemberFormController',
                    controllerAs: 'vm',
                    animation: false,
                    bindToController: true
                });
            },
            checkMemberSelected: function (store) {
                var id = this.getCurrentStaffMember().id;
                if(id && _.some(store.staff,['id', id])) return;
                this.clearCurrentStaffMember();
                $timeout(this.openMemberSelector, 500);
            }
        }
    }

})();
