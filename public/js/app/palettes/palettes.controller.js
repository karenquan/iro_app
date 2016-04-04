(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "$http", "palettesService"];

  function PalettesController($log, $http, palettesService) {
    var vm = this;

    // BINDINGS
    vm.palette;
    getPalette();

    // FUNCTIONS
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
