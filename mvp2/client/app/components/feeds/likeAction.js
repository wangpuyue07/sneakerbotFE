angular.module('ssNg').directive('likeAction', [ 'staffService', '_', 'newsService', function(staffService, _, newsService){

    return {
        restrict: 'E',
        templateUrl: 'components/feeds/likeAction.html',
        controllerAs: 'vm',
        bindToController: {
            activity : '=',
            spotId : '='
        },
        controller: function(){

            var vm = this;

            vm.likeFeedItem = function(){
                vm.activity.likes = vm.activity.likes || [];
                vm.activity.likes.push(staffService.getCurrentStaffMember().id);
                newsService.like(vm.activity.id);
            };

            vm.unLikeFeedItem = function(){
                vm.activity.likes = vm.activity.likes || [];
                var index = vm.activity.likes.indexOf(staffService.getCurrentStaffMember().id);
                if(index > -1){
                    newsService.like(vm.activity.id);
                    vm.activity.likes.splice(index, 1);
                }
            };

            vm.likedByYou = function(){
                if(!vm.activity) return false;
                vm.activity.likes = vm.activity.likes || [];
                var id = staffService.getCurrentStaffMember().id;
                return vm.activity.likes.indexOf(id) > -1;
            };

        }
    }
} ]);
