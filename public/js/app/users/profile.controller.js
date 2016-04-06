(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "$http", "tokenService", "userService"];

  function ProfileController($log, $http, token, userService) {
    var vm = this;

    // BINDINGS
    vm.createColorList     = createColorList;
    vm.createCustomPalette = createCustomPalette;
    vm.createPaletteList   = createPaletteList;
    vm.customPaletteName;
    vm.currentUser;
    vm.removeColor         = removeColor;
    vm.removeColorList     = removeColorList;
    vm.removeCustomPalette = removeCustomPalette;
    vm.removePalette       = removePalette;
    vm.removePaletteList   = removePaletteList;

    getCurrentUser();

    // FUNCTIONS
    function createColorList() {
      userService
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
      var palette = {};
      var colors = [];

      var customHexOne   = vm.customHexOne,
          customHexTwo   = vm.customHexTwo,
          customHexThree = vm.customHexThree,
          customHexFour  = vm.customHexFour,
          customHexFive  = vm.customHexFive;

      if (customHexOne !== undefined && (customHexOne.length == 3 || customHexOne.length == 6)) {
        colors.push(customHexOne);
      }
      if (customHexTwo !== undefined && (customHexTwo.length == 3 || customHexTwo.length == 6)) {
        colors.push(customHexTwo);
      }
      if (customHexThree !== undefined && (customHexThree.length == 3 || customHexThree.length == 6)) {
        colors.push(customHexThree);
      }
      if (customHexFour !== undefined && (customHexFour.length == 3 || customHexFour.length == 6)) {
        colors.push(customHexFour);
      }
      if (customHexFive !== undefined && (customHexFive.length == 3 || customHexFive.length == 6))  {
        colors.push(vm.customHexFive);
      }

      palette.colors = colors;
      palette.name = vm.customPaletteName;
      $log.info(palette);

      userService
        .createCustomPalette(palette)
        .then(function(res) {
          $log.info("profile controller // create custom palette");
          getCurrentUser();
          vm.customHexOne = "";
          vm.customHexTwo = "";
          vm.customHexThree = "";
          vm.customHexFour = "";
          vm.customHexFive = "";
          vm.customPaletteName = "";
        }, function(error) {
          $log.error(error);
        });
    }

    function createPaletteList() {
      userService
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
      userService
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
      userService
        .removeColorList(listId)
        .then(function(res) {
          $log.info("profile controller // removed color list");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function removeCustomPalette(paletteId) {
      $log.info("cusom palette id to remove:", paletteId);
      userService
        .removeCustomPalette(paletteId)
        .then(function(res) {
          $log.info("profile controller // removed custom palette");
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function removePalette(paletteListId, paletteId) {
      $log.info("palette list id: ", paletteListId);
      $log.info("palette id: ", paletteId);
      userService
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
      userService
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
