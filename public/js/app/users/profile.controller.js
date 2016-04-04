(function() {
  "use strict";

  angular
    .module("app")
    .controller("ProfileController", ProfileController);

  ProfileController.$inject = ["$log", "authService", "$http", "tokenService"];

  function ProfileController($log, authService, $http, token) {
    var vm = this;

    // BINDINGS
    vm.authService = authService;
    vm.currentUser;

    currentUser();

    // FUNCTIONS
    function currentUser() {
      $http({
        method: "GET",
        url: "/api/users/me",
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(res) {
        $log.info("successful user retrieval?", res.data);
        vm.currentUser = res.data;
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }
  }
})();
