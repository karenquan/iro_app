(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "authService", "$http", "tokenService", "userService"];

  function ProfileController($log, authService, $http, token, userService) {
    var vm = this;

    // BINDINGS
    vm.authService = authService;
    vm.createColorList = createColorList;
    vm.currentUser;
    vm.createPaletteList = createPaletteList;
    vm.userService = userService;

    getCurrentUser();

    // FUNCTIONS
    function createColorList() {
      vm.userService
        .createColorList(vm.currentUser, vm.customColorListName)
        .then(function(res) {
          $log.info("profile controller // create color list creation");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function createPaletteList() {
      vm.userService
        .createPaletteList(vm.customPaletteListName)
        .then(function(res) {
          $log.info("profile controller // create palette list creation ");
          getCurrentUser();
        }, function(error) {

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
        $log.info(vm.currentUser.colorLists);
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }
  }
})();
