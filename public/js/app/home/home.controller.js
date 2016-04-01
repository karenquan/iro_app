(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "$http"];

  function HomeController($log, $http) {
    var vm = this;

    getTopColors();
    getTopPalettes();

    // BINDINGS
    vm.colorSearchInput;
    vm.topColors;
    vm.topPalettes;

    // HELPERS
    function getTopColors() { // STICK IN COLORS SERVICE
      $http
        .get("/api/colors/top")
        .then(function(res) {
          vm.topColors = res.data;
        }, function(error) {
          $log.error(error);
        });
    }

    function getTopPalettes() { // STICK IN PALETTES SERVICE
      $http
        .get("/api/palettes/top")
        .then(function(res) {
          vm.topPalettes = res.data;
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
