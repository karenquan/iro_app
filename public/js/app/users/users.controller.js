(function() {
  "use strict";

  angular
    .module("app")
    .controller("UsersController", UsersController);

  UsersController.$inject = ["$log"];

  function UsersController($log) {
    $log.info("profile controller loaded");
  }
})();
