(function() {
  "use strit";

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "$http", "tokenService", "$state"];

  function authService($log, $http, token, $state) {
    $log.info("auth service loaded");
    var service = {
      login: login,
      isLoggedIn: isLoggedIn,
      logout: logout
    };

    return service;

    function isLoggedIn() {
      return token.retrieve() != null;
    }

    function login(data) {
      $log.info("auth service // login");
      $log.info(data);
      var promise = $http({
        method: "POST",
        url: "/api/token",
        data: data,
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(res) {
        $log.info("auth service // login // token:", res.data.token);
        token.store(res.data.token);
        return token.decode();
      });

      return promise;
    }

    function logout() {
      $log.info('logout, yo');
      token.destroy();
      $log.info("token:", token.retrieve());
      $state.go("home");
    }
  }
})();
