'use strict';
(function () {

    angular.module('ssNg').controller('ChooseStaffMemberFormController', ['staffService', 'Auth', '_', ChooseStaffMemberFormController]);

    function ChooseStaffMemberFormController(staffService, Auth, _) {

        var vm = this;

        staffService.listStaff({organisationId: Auth.getCurrentUser().organisation.id}).then(function (res) {
            vm.staff = res;
        });

        vm.setStaffMember = function (staffMember) {
            staffService.setCurrentStaffMember(staffMember);
            return Auth.reLoadUser().then(function (res) {
                vm.$dismiss();
            });
        };

        vm.createStaff = function () {
            var command = {
                names: [{text: vm.fullName}],
                organisationId: Auth.getCurrentUser().organisation.id,
                storeId: Auth.getCurrentUser().id
            };
            var id;
            staffService.createStaff(command).then(function (res) {
                id = res.id;
                vm.fullName = null;
                return Auth.reLoadUser();
            }).then(function (res) {
                var staff = _.find(res.staff, ['id', id]);
                staffService.setCurrentStaffMember(staff);
                vm.$close();
            })
        }

    }

})();
