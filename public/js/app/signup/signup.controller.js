(function() {
  "use strict";

  angular
    .module("app")
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ["$log", "$http", "$state", "authService", "userService"];

  function SignUpController ($log, $http, $state, authService, userService) {
    var vm = this;

    // BINDINGS
    vm.submitSignUp = submitSignUp;
    vm.user = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };

    // FUNCTIONS
    function submitSignUp() {
      userService.signUp(vm.user)
        .then(function(res) {
          return authService.login(vm.user);
        })
        .then(function(decodedToken) {
          $log.info("Logged in:", decodedToken);
          $state.go("home");
        },
        function(error) {
          $log.error("Login Error:", error);
        });;
    }
  }
})();
