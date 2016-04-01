(function() {
  "use strict";

  angular
    .module("app")
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ["$log"];

  function SignUpController ($log) {
    var vm = this;

    vm.signUp = {
      name: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  }
})();
