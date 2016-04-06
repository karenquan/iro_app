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
      var pageNum = $state.params.page;
      var numResults = $state.params.numResults;
      palettesService
        .getPalettesByHex(hex, pageNum, numResults)
        .then(function(res) {
          vm.palettes = res;
        }, function(error) {
          $log.error(error);
        });
    }

    function searchPalettes() {
      palettesService
        .getPalettesByHex("vm.paletteSearchInput", "2")
        .then(function(res) {
          $log.info(":(");
          $state.go("paletteSearch", { hex: vm.paletteSearchInput, page: "4" });
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
