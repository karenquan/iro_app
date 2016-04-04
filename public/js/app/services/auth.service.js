(function() {
  "use strit";

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "$http", "tokenService", "$state"];

  function authService($log, $http, token, $state) {
    $log.info("auth service loaded");
    var service = {
      currentUser: currentUser,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      refreshToken: refreshToken
    };

    return service;

    function currentUser() {
      var tokenData = token.decode();

      $log.info("current user retrieved:", tokenData);

      return tokenData;
    }

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
      token.destroy();
      $state.go("home");
    }

    function refreshToken() {
      var promise = $http({
        method: 'POST',
        url:    '/api/users/me/token'
      })
      .then(function(res) {
        token.store(res.data.token);
        return token.decode();
      });

      return promise;
    }
  }
})();
