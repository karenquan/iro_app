(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "authService"];

  function ProfileController($log, authService) {
    var vm = this;
    $log.info("users controller loaded (profile)");

    vm.authService = authService;
  }
})();
