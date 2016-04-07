(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "palettesService", "authService", "userService", "$timeout"];

  function PalettesController($log, palettesService, authService, userService, $timeout) {
    var vm = this;

    // BINDINGS
    vm.addedPalette     = false;
    vm.addPaletteToList = addPaletteToList;
    vm.currentUserPaletteLists;
    vm.fade             = false;
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
          vm.addedPalette = true;
          $timeout(function() {
              vm.addedPalette = false;
          }, 3000)
          .then(function() {
            vm.fade = true;
          });
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
