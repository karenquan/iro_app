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
    vm.searchPalettes = searchPalettes;

    getPalettesByHex();

    // FUNCTIONS
    function getPalettesByHex() {
      var hex = $state.params.hex;

      palettesService
        .getPalettesByHex(hex)
        .then(function(res) {
          vm.palettes = res;
        }, function(error) {
          $log.error(error);
        });
    }

    function searchPalettes() {
      palettesService
        .getPalettesByHex(vm.paletteSearchInput)
        .then(function(res) {
          $state.go("paletteSearch", { hex: vm.paletteSearchInput });
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
