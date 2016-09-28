'use strict';

angular.module('ssNg')
    .directive('insightsDashboard', function () {
        return {
            restrict: 'E',
            templateUrl: 'insights/dashboard.html',
            controllerAs: 'vm',
            scope: {},
            controller: ['insightService', function (insightService) {
                var vm = this;

                insightService.getTopStaff().then(function (res) {
                    vm.topStaff = {
                        data: [_.map(res, function (item) {
                            return item.quantity;
                        })],
                        labels: _.map(res, function (item) {
                            return item.staffMember.names[0].text.substring(0, 8)
                        })
                    }
                });

                insightService.getTopStores().then(function (res) {
                    vm.topStores = {
                        data: [_.map(res, function (item) {
                            return item.quantity;
                        })],
                        labels: _.map(res, function (item) {
                            return item.store.names[0].text.substring(0, 7) + '\'';
                        })
                    }
                });

                vm.stats = {
                    feedbackByStore: {
                        labels: ['Newmarket', 'Wellington'],
                        data: [
                            [3, 6]
                        ]
                    },
                    feedbackByTag: {
                        labels: ['Fit', 'Style', 'Size', 'Colour', 'Quality'],
                        data: [[5, 2, 8, 2, 1]]
                    }
                }
            }]
        }
    });