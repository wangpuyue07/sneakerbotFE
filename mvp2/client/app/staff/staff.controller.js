'use strict';

(function(){

  angular.module('ssNg.staff').controller('StaffController', ['staffService', '$window', '$location', 'Auth', 'storeService', '_', StaffController]);

  function StaffController(staffService, $window, $location, Auth, storeService, _) {

      var that = this;

      that.newMember = {};
      that.organisationId = null;
      that.storeId = null;

      function listStores() {
          return storeService.listStores({organisationId: that.organisationId }).then(function(res){
              that.stores = res;
          });
      }

      Auth.getStoreAsync().then(function(res){
          that.storeName = res.names[0].text;
          that.organisationId = res.organisation.id;
          that.storeId = res.id;
          listStaff();
          listStores();
      });

      function listStaff(){
          return staffService.listStaff({organisationId: that.organisationId, storeId : that.storeId }).then(function(res){
              that.list = res;
          });
      }

      that.getStore = function(storeId){
            return _.find(that.stores, ['id', storeId]);
      };

      that.createStaff = function(){
          var command = {
              names : [{ text : that.newMember.name }],
              organisationId : that.organisationId,
              storeId : that.storeId
          };
        staffService.createStaff(command).then(function(res){
            that.newMember = {};
            listStaff();
            Auth.reLoadUser();
        })
      };
  }

})();
