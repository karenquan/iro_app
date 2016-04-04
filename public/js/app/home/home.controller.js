(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "$http", "colorService", "palettesService"];

  function HomeController($log, $http, colorService, palettesService) {
    var vm = this;

    getTopColors();
    getTopPalettes();

    // BINDINGS
    vm.colorSearchInput;
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
  }
})();
