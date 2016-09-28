angular.module('ssNg').controller('CommentsController', ['$http', '$scope', 'staffService', 'Auth', '_', '$sce', '$location', '$timeout', '$rootScope', '$anchorScroll', function ($http, $scope, staffService, Auth, _, $sce, $location, $timeout, $rootScope, $anchorScroll) {

    var vm = this;

    vm.getStaffMember = staffService.getCurrentStaffMember;

    vm.staff = [];

    function updateStaff() {
        vm.staff = _.filter(_.map(Auth.getCurrentUser().staff, function (x) {
            x.label = x.slug;
            return x;
        }), function (staff) {
            return staff.id != staffService.getCurrentStaffMember().id;
        });
    }

    updateStaff();

    $rootScope.$on('ss:staffMemberChanged', function () {
        updateStaff();
    });

    vm.newComment = null;

    vm.mentions = {};

    vm.comments = [];

    vm.activityReferenceId = $location.search().activityReferenceId;

    $timeout(function () {
        vm.clearHighlights = true;
    }, 1000);

    function loadComments() {
        return $http.get('/api/activity/?direction=asc&objectId=' + vm.objectId).success(function (data) {
            vm.comments = data;
            vm.lockCommentForm = false;
        });
    }

    $scope.$watch('vm.objectId', function (newValue) {
        if (newValue) {
            loadComments().then(function () {
                if (vm.activityReferenceId) {
                    $location.hash(vm.activityReferenceId);
                    $anchorScroll();
                }
            });
        }
    });

    function createPost(text) {
        var comment = {
            id: 'pending', comment: text, objectId: vm.objectId, objectType: vm.objectType, store: Auth.getCurrentUser().names[0].text
        };
        comment.subject = vm.getStaffMember();
        comment.createdAt = new Date().getTime();
        return comment;
    }

    vm.addComment = function () {
        var comment = createPost(vm.newComment);
        vm.comments.push(comment);
        vm.lockCommentForm = true;
        $http.post('/api/activity/comments/', {recipientId: vm.recipientId, comment: comment.comment, objectId: comment.objectId, objectType: comment.objectType, mentions: Object.keys(vm.mentions)}).success(function (data) {
            vm.comments[vm.comments.length - 1].id = data.id;
            vm.newComment = null;
            vm.lockCommentForm = false;
        })
    };

    vm.deleteComment = function (id, index) {
        var confirmed = confirm('Are you sure you want to delete this comment?');
        if (confirmed) {
            vm.comments.splice(index, 1);
            $http.delete('/api/activity/comments/' + id, {}).success(function () {
            });
        }
    };

    vm.vote = function (comment) {
        var index = comment.votes.indexOf(vm.getStaffMember().id);
        if (index > -1) {
            comment.votes.splice(index, 1);
        } else {
            comment.votes.push(vm.getStaffMember().id);
        }
        $http.put('/api/comments/' + comment.id + '/vote');
    };

    vm.isVotedFor = function (comment) {
        if (!comment) return false;
        return comment.votes.indexOf(vm.getStaffMember()._id) > -1;
    };

    vm.trySubmit = function ($event) {
        //Hack to get around mentio not being selected.
        if (angular.element('mentio-menu').is(':visible')) return;
        if ($event.keyCode == 13) {
            vm.addComment()
        }
    };

    vm.getMentionText = function (item) {
        vm.mentions[item.id] = true;
        return '@' + item.slug;
    };

    vm.hydrateComment = function (comment) {
        return $sce.trustAsHtml(comment.comment.replace(/(@(\S*))/g, '<a href="/staff/$2">@$2</a>'));
    }
}
]);
