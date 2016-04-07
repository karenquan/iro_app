(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorSearchController", ColorSearchController);

  ColorSearchController.$inject = ["$log", "colorService"];

  function ColorSearchController($log, colorService) {
    var vm = this;

    vm.topColors;

    getTopColors(100);

    function getTopColors(num) {
      colorService
        .getTopColors(num)
        .then(function(res) {
          vm.topColors = res;
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
