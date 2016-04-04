(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "authService", "$http", "tokenService"];

  function ProfileController($log, authService, $http, token) {
    var vm = this;
    $log.info("users controller loaded (profile)");

    // BINDINGS
    vm.authService = authService;
    vm.currentUser = currentUser;

    currentUser();

    // FUNCTIONS
    function currentUser() {
      $log.info("attempting to get current user for profile (profile controller)");
      $http({
        method: "GET",
        url: "/api/users/me",
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(res) {
        $log.info("success user retrieval?", res);
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }
  }
})();
