(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "palettesService", "authService"];

  function PalettesController($log, palettesService, authService) {
    var vm = this;

    // BINDINGS
    vm.addPaletteToList = addPaletteToList;
    vm.authService = authService;
    vm.currentUserPaletteLists;
    vm.palette;
    vm.palettesService = palettesService;

    getPalette();
    getCurrentUserPaletteLists();

    // FUNCTIONS
    function addPaletteToList() {
      vm.palettesService
        .addPaletteToList(vm.selectedListId, vm.palette)
        .then(function(response) {
          $log.info("successfully added palette to list");
        }, function(error) {
          $log.error(error);
        });
    }

    function getCurrentUserPaletteLists() {
      vm.authService
      .currentUser()
      .then(function(response) {
        $log.info(response);
        var user = response;
        vm.currentUserPaletteLists = user.paletteLists;
      }, function(error) {
        $log.error(error);
      });
    }

    function getPalette() {
      vm.palettesService
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
