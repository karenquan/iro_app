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
    vm.hexSearch = $state.params.hex;

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
      var defaultPage = 1,
          defaultNumResults = 100;

      palettesService
        .getPalettesByHex(vm.paletteSearchInput, defaultPage, defaultNumResults)
        .then(function(res) {
          $state.go("paletteSearch", { hex: vm.paletteSearchInput, page: defaultPage, num: defaultNumResults });
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
