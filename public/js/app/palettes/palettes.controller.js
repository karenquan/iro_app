(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "$http", "palettesService", "tokenService", "authService"];

  function PalettesController($log, $http, palettesService, token, authService) {
    var vm = this;

    // BINDINGS
    vm.currentUserPaletteLists;
    vm.getCurrentUserPaletteLists;
    vm.palette;

    getPalette();
    getCurrentUserPaletteLists();

    // FUNCTIONS
    function getCurrentUserPaletteLists() {
      authService.currentUser()
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
