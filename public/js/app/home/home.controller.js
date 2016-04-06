(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "$http", "colorService", "palettesService", "$state"];

  function HomeController($log, $http, colorService, palettesService, $state) {
    var vm = this;

    getTopColors();
    getTopPalettes();

    // BINDINGS
    vm.colorSearchInput;
    vm.paletteSearchInput;
    vm.getPalettesByHex = getPalettesByHex;
    vm.topColors;
    vm.topPalettes;

    // HELPERS
    function getTopColors() {
      colorService
        .getTopColors()
        .then(function(res) {
          vm.topColors = res; // top colors object
        }, function(error) {
          $log.error(error);
        });
    }

    function getTopPalettes() {
      palettesService
        .getTopPalettes()
        .then(function(res) {
          vm.topPalettes = res; // top palettes object
        }, function(error) {
          $log.error(error);
        });
    }

    function getPalettesByHex() {
      $state.go("paletteSearch", { hex: vm.paletteSearchInput });
      // palettesService
      //   .getPalettesByHex(vm.paletteSearchInput)
      //   .then(function(res) {
      //     $log.info('response to get palettes by hex:', res);
      //   }, function(error) {
      //     $log.error(error);
      //   });
    }
  }
})();
