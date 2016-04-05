(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "$http", "palettesService", "tokenService"];

  function PalettesController($log, $http, palettesService, token) {
    var vm = this;

    // BINDINGS
    vm.getCurrentUserPaletteLists;
    vm.palette;

    getPalette();

    // FUNCTIONS
    function getCurrentUserPaletteLists() {

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
