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
    vm.topColors;
    vm.topPalettes;

    // HELPERS
    function getTopColors() {
      $http
        .get("/api/colors/top")
        .then(function(res) {
          vm.topColors = res.data;
        }, function(error) {
          $log.error(error);
        });
    }

    function getTopPalettes() {
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
