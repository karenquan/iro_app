(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorSearchController", ColorSearchController);

  ColorSearchController.$inject = ["$log", "colorService", "$state"];

  function ColorSearchController($log, colorService, $state) {
    var vm = this;

    // BINDINGS
    vm.searchColor = searchColor;
    vm.topColors;

    getTopColors(100);

    // FUNCTIONS
    function getTopColors(num) {

      colorService
        .getTopColors(num)
        .then(function(res) {
          vm.topColors = res;
        }, function(error) {
          $log.error(error);
        });
    }

    function searchColor() {
      $state.go("color", { hex: vm.colorSearchInput });
    }
  }
})();
