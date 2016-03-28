(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "$http"];

  function HomeController($log, $http) {
    var vm = this;

    getTopColors();

    // BINDINGS
    vm.topColors;

    // HELPERS
    function getTopColors() {
      $http
        .get("/api/colors/top")
        .then(function(res) {
          vm.topColors = res.data;
          // $log.info(res.data);
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
