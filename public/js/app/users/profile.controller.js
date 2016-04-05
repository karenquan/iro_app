(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "authService", "$http", "tokenService", "userService"];

  function ProfileController($log, authService, $http, token, userService) {
    var vm = this;

    // BINDINGS
    vm.authService         = authService;
    vm.createColorList     = createColorList;
    vm.createCustomPalette = createCustomPalette;
    vm.createPaletteList   = createPaletteList;
    vm.currentUser;
    vm.removeColor         = removeColor;
    vm.removeColorList     = removeColorList;
    vm.removePalette       = removePalette;
    vm.removePaletteList   = removePaletteList;
    vm.userService         = userService;

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

    function createCustomPalette(colors) {
      $log.info('make custom palette');
      var palette = [];

      vm.userService
        .createCustomPalette(palette)
        .then(function(res) {
          $log.info("profile controller // create custom palette");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function createPaletteList() {
      vm.userService
        .createPaletteList(vm.customPaletteListName)
        .then(function(res) {
          $log.info("profile controller // create palette list creation");
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
        .removeColor(colorListId, colorId)
        .then(function(res) {
          $log.info("profile controller // removed color");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function removeColorList(listId) {
      $log.info(listId);
      vm.userService
        .removeColorList(listId)
        .then(function(res) {
          $log.info("profile controller // removed color list");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function removePalette(paletteListId, paletteId) {
      $log.info("palette list id: ", paletteListId);
      $log.info("palette id: ", paletteId);
      vm.userService
        .removePalette(paletteListId, paletteId)
        .then(function(res) {
          $log.info("profile controller // removed palette");
          getCurrentUser();
        }, function(error) {
          $log.info(error);
        });
    }

    function removePaletteList(listId) {
      $log.info("palette list id:", listId);
      vm.userService
        .removePaletteList(listId)
        .then(function(res) {
          $log.info("profile controller // removed palette list");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
