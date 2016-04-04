(function() {
  "use strict";

  angular
    .module("app")
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ["$log", "$http", "$state", "authService", "userService"];

  function SignUpController ($log, $http, $state, authService, userService) {
    var vm = this;

    vm.user = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    vm.submitSignUp = submitSignUp;

    function submitSignUp() {
      userService.signUp(vm.user)
        .then(function() {
          authService
            .login(vm.user)
            .then(function(decodedToken) {
              $log.info("Logged in:", decodedToken);
              $state.go("home");
            },
            function(error) {
              $log.error("Login Error:", error);
            });
        });
    }
  }
})();
