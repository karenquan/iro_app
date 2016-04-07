(function() {
  "use strict";

  angular
    .module("app")
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ["$log", "$http", "$state", "authService", "userService"];

  function SignUpController ($log, $http, $state, authService, userService) {
    var vm = this;
    var firstNameInput = angular.element(document.getElementById("firstName"));
    var lastNameInput = angular.element(document.getElementById("lastName"));
    var emailInput = angular.element(document.getElementById("email"));
    var passwordInput = angular.element(document.getElementById("password"));

    // BINDINGS
    vm.emailConflict      = false;
    vm.emailEmpty         = false;
    vm.invalidEmailFormat = false;
    vm.firstNameEmpty     = false;
    vm.lastNameEmpty      = false;
    vm.submitSignUp       = submitSignUp;
    vm.user = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    vm.validateFirstName = validateFirstName;
    vm.validateLastName = validateLastName;
    vm.validateEmail = validateEmail;
    vm.validatePassword = validatePassword;

    // FUNCTIONS
    function submitSignUp() {
      userService.create(vm.user)
        .then(function(res) {
          return authService.login(vm.user);
        })
        .then(function(decodedToken) {
          $log.info("Logged in:", decodedToken);
          $state.go("profile");
        },
        function(error) {
          $log.error("Login Error:", error);
          vm.emailConflict = true;
        });;
    }

    function validateFirstName() {
      vm.firstNameEmpty = firstNameInput.hasClass("ng-not-empty") ? false : true;
    }

    function validateLastName() {
      vm.lastNameEmpty = lastNameInput.hasClass("ng-not-empty") ? false : true;
    }

    function validateEmail() {
      vm.emailEmpty = emailInput.hasClass("ng-not-empty") ? false : true;
      vm.invalidEmailFormat = emailInput.hasClass("ng-invalid-email")
    }

    function validatePassword() {
      vm.passwordEmpty = passwordInput.hasClass("ng-not-empty") ? false : true;
    }
  }
})();
