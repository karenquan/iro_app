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
    vm.createPaletteList = createPaletteList;
    vm.currentUser;
    vm.removeColor = removeColor;
    vm.userService = userService;

    getCurrentUser();

    // FUNCTIONS
    function createColorList() {
      vm.userService
        .createColorList(vm.currentUser, vm.customColorListName)
        .then(function(res) {
          $log.info("profile controller // create color list creation");
          getCurrentUser();
          vm.customColorListName = '';
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
          vm.customPaletteListName = '';
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
        $log.info(vm.currentUser.colorLists);
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }

    function removeColor(colorListId, colorId) {
      vm.userService
        .removeColorFromList(colorListId, colorId)
        .then(function(res) {
          $log.info("profile controller // removed color");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
