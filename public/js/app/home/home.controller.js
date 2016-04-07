(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "$http", "colorService", "palettesService", "$state"];

  function HomeController($log, $http, colorService, palettesService, $state) {
    var vm = this;

    getTopColors(20);
    getTopPalettes(10);

    // BINDINGS
    vm.colorSearchInput;
    vm.paletteSearchInput;
    vm.searchPalettes = searchPalettes;
    vm.topColors;
    vm.topPalettes;
    vm.searchColor    = searchColor;

    // HELPERS
    function getTopColors(num) {
      colorService
        .getTopColors(num)
        .then(function(res) {
          vm.topColors = res; // top colors object
        }, function(error) {
          $log.error(error);
        });
    }

    function getTopPalettes(num) {
      palettesService
        .getTopPalettes(num)
        .then(function(res) {
          vm.topPalettes = res; // top palettes object
        }, function(error) {
          $log.error(error);
        });
    }

    function searchPalettes() {
      $state.go("paletteSearch", { hex: vm.paletteSearchInput, page: 1, num: 100 });
    }

    function searchColor() {
      $state.go("color", { hex: vm.colorSearchInput });
    }
  }
})();
