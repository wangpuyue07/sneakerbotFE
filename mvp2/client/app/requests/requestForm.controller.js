'use strict';
(function () {

    angular.module('ssNg.requests').controller('requestFormController', ['$rootScope', '$state', '$location', 'requestService', 'product', '$uibModalInstance', RequestFormController]);

    function RequestFormController($rootScope, $state, $location, requestService, product, $uibModalInstance) {
        var vm = this;
        vm.product = product;

        vm.productTypes = [
            { name : 'Shirt', id : 11},
            { name : 'Pants', id : 11},
            { name : 'Jacket', id : 12},
            { name : 'Accessories', id : 12},
            { name : 'Footwear', id : 12},
            { name : 'Shorts', id : 12},
            { name : 'T-Shirts', id : 12},
            { name : 'Suit Jackets', id : 12},
        ];
        vm.colours = [
            {id: 1, name: 'Any'},
            {name: 'red', id: 11},
            {name: 'green', id: 12},
            {name: 'blue', id: 13}
            ];
        vm.sizes = [
            {id: 1, name: 'One Size'},
            {id: 11, name: 'XS'},
            {name: 'S', id: 12},
            {name: 'M', id: 13},
            {name: 'L', id: 14},
            {name: 'XL', id: 15},
            {name: 'XXL', id: 16},
            {name: 'XXXL', id: 17}];

        vm.request = {
            sku: product.sku
        };

        vm.selectedProductType = vm.productTypes[0];
        vm.selectedColour = vm.colours[0];
        vm.selectedSize = vm.sizes[0];

        vm.createRequest = function () {
            vm.request.colour = vm.selectedColour.name;
            vm.request.size = vm.selectedSize.name;
            vm.request.productType = vm.selectedProductType.name;
            requestService.createRequest(vm.request).then(function (res) {
                $state.go('news');
                $uibModalInstance.close();
            });
        };

        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

    }

})();