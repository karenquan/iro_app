(function() {
  "use strict";

  angular
    .module("app")
    .factory("userService", userService);

    userService.$inject = ["$log", "$http", "authService"];

    function userService($log, $http) {
      $log.info("user service loaded");
      var service = {
        signUp: signUp,
        login: login
      };

      return service;

      function signUp(data) {
        var promise = $http({
          method: "POST",
          url: "/api/users",
          data: data,
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(res) {
          $log.info("Success:", res);
        });

        return promise;
      }
    }
})();
