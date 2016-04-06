(function() {
  "use strict";

  angular
    .module("app")
    .controller("PaletteSearchController", PaletteSearchController);

  PaletteSearchController.$inject = ["$log", "$state", "palettesService"];

  function PaletteSearchController($log, $state, palettesService) {
    var vm = this;

    // BINDINGS
    vm.palettes;

    getPalettesByHex();

    // FUNCTIONS
    function getPalettesByHex() {
      var hex = $state.params.hex;

      palettesService
        .getPalettesByHex(hex)
        .then(function(res) {
          vm.palettes = res;
          $log.info(vm.palettes);
          // $log.info('response to get palettes by hex:', res);
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
