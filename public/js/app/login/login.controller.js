(function() {
  "use strict";

  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$log", "authService", "$state"];

  function LoginController($log, authService, $state) {
    var vm = this;

    // BINDINGS
    vm.conflict    = false;
    vm.submitLogin = submitLogin;
    vm.user = {
      email: "",
      password: ""
    };

    // FUNCTIONS
    function submitLogin() {
      authService
        .login(vm.user)
        .then(function(decodedToken) {
          $log.info("logged in", decodedToken);
          $state.go("profile");
        }, function(error) {
            vm.conflict = true;
            $log.error("login error:", error)
        });
    }
  }
})();
