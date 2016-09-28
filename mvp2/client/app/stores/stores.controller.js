'use strict';

(function(){

  angular.module('ssNg.stores').controller('StoresController', ['storeService', '$window', '$location', 'Auth', StoresController]);

  function StoresController(storeService, $window, $location, Auth) {

      var vm = this;

      vm.storeService = storeService;

      vm.rows = {};

      vm.store = null;
      Auth.getStoreAsync().then(function(res){
          vm.store = res;
         listStores();
      });

      vm.updateStore = function(store){
          storeService.updateStore({ id : store.id, names : store.names });
      };

      function listStores() {
          storeService.listStores({organisationId: vm.store.organisation.id}).then(function (res) {
              vm.list = res;
          });
      }
  }

})();
