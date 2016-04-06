(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "palettesService", "authService", "userService"];

  function PalettesController($log, palettesService, authService, userService) {
    var vm = this;

    // BINDINGS
    vm.addPaletteToList = addPaletteToList;
    vm.currentUserPaletteLists;
    vm.palette;

    getPalette();
    if(authService.isLoggedIn()) {
      getCurrentUserPaletteLists();
    }

    // FUNCTIONS
    function addPaletteToList() {
      userService
        .addPaletteToList(vm.selectedListId, vm.palette)
        .then(function(response) {
          $log.info("successfully added palette to list");
        }, function(error) {
          $log.error(error);
        });
    }

    function getCurrentUserPaletteLists() {
      authService
      .currentUser()
      .then(function(response) {
        $log.info(response);
        var user = response;
        vm.currentUserPaletteLists = user.paletteLists;
        $log.info("current user palettes:", user.paletteLists);
      }, function(error) {
        $log.error(error);
      });
    }

    function getPalette() {
      palettesService
        .getPalette()
        .then(function(response) {
          $log.info(response);
          vm.palette = response;
        }, function(error) {
          $log.error(error);
        }
      );
    }
  }
})();
