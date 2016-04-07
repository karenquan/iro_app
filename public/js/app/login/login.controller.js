(function() {
  "use strict";

  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$log", "authService", "$state"];

  function LoginController($log, authService, $state) {
    var vm = this;
    var emailInput = angular.element(document.getElementById("email"));
    var passwordInput = angular.element(document.getElementById("password"));

    // BINDINGS
    vm.conflict            = false;
    vm.emailEmpty          = false;
    vm.invalidEmailFormat  = false;
    vm.passwordEmpty       = false;
    vm.submitLogin         = submitLogin;
    vm.user = {
      email: "",
      password: ""
    };
    vm.validateEmail            = validateEmail;
    vm.validatePassword       = validatePassword;

    // FUNCTIONS
    function submitLogin() {
      authService
        .login(vm.user)
        .then(function(decodedToken) {
          $state.go("profile");
        }, function(error) {
            vm.conflict = true;
            $log.error("login error:", error);
        });
    }

    function validateEmail() {
      vm.invalidEmailFormat = emailInput.hasClass("ng-invalid-email") ? true : false;
      vm.emailEmpty = emailInput.hasClass("ng-not-empty") ? false : true;
    }

    function validatePassword() {
      vm.passwordEmpty = passwordInput.hasClass("ng-not-empty") ? false : true;
    }
  }
})();
