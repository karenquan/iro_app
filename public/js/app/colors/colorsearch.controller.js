(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorSearchController", ColorSearchController);

  ColorSearchController.$inject = ["$log"];

  function ColorSearchController($log) {
    $log.info('color search controller');
  }
})();
