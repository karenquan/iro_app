(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "$http", "tokenService", "userService", "$state"];

  function ProfileController($log, $http, token, userService, $state) {
    var vm = this;

    // BINDINGS
    vm.colorClick          = colorClick;
    vm.createColorList     = createColorList;
    vm.createCustomPalette = createCustomPalette;
    vm.createPaletteList   = createPaletteList;
    vm.customPaletteName;
    vm.currentUser;
    vm.paletteClick        = paletteClick;
    vm.removeColor         = removeColor;
    vm.removeColorList     = removeColorList;
    vm.removeCustomPalette = removeCustomPalette;
    vm.removePalette       = removePalette;
    vm.removePaletteList   = removePaletteList;
    vm.showColorListForm   = false;

    getCurrentUser();

    // FUNCTIONS
    function colorClick(hex) {
      $state.go("color", { hex: hex });
    }

    function createColorList() {
      userService
        .createColorList(vm.currentUser, vm.customColorListName)
        .then(function(res) {
          getCurrentUser();
          vm.customColorListName = '';
        }, function(error) {
          $log.error(error);
        });
    }

    function createCustomPalette(colors) {
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

      userService
        .createCustomPalette(palette)
        .then(function(res) {
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
        vm.currentUser = res.data;
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }

    function paletteClick(id) {
      $state.go("palette", { id: id });
    }

    function removeColor(colorListId, colorId) {
      userService
        .removeColor(colorListId, colorId)
        .then(function(res) {
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
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function removeCustomPalette(paletteId) {
      userService
        .removeCustomPalette(paletteId)
        .then(function(res) {
          getCurrentUser();
        }, function(error) {
          $log.error(error);
        });
    }

    function removePalette(paletteListId, paletteId) {
      userService
        .removePalette(paletteListId, paletteId)
        .then(function(res) {
          getCurrentUser();
        }, function(error) {
          $log.info(error);
        });
    }

    function removePaletteList(listId) {
      userService
        .removePaletteList(listId)
        .then(function(res) {
          getCurrentUser();
          vm.updatedColorListName = "";
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
