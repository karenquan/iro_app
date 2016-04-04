(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "authService", "$http", "tokenService"];

  function ProfileController($log, authService, $http, token) {
    var vm = this;

    // BINDINGS
    vm.authService = authService;
    vm.createColorList = createColorList;
    vm.currentUser;

    getCurrentUser();

    // FUNCTIONS
    function createColorList() {
      var data = {
        name: vm.customListName
      };

      $http({
        method: "POST",
        url: "/api/users/me/createColorList",
        data: data,
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(res) {
        $log.info("successful user retrieval in createColorList (profile controller)", res);
        getCurrentUser();
      }, function(error) {
        $log.error(error);
      });
    }

    function getCurrentUser() {
      $http({
        method: "GET",
        url: "/api/users/me",
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(res) {
        $log.info("successful user retrieval", res.data);
        vm.currentUser = res.data;
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }
  }
})();
