(function() {
  "use strict";

  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$log", "authService", "$state"];

  function LoginController($log, authService, $state) {
    var vm = this;

    // BINDINGS
    vm.submitLogin = submitLogin;
    vm.user = {
      email: "",
      password: ""
    };

    function submitLogin() {
      authService
        .login(vm.user)
        .then(function(decodedToken) {
          $log.info("logged in", decodedToken);
          $state.go("home");
        }, function(error) {
            $log.error("login error:", error)
        });
    }
  }
})();
