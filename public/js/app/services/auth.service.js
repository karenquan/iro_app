(function() {
  "use strit";

  angular
    .module("app")
    .factory("authService", authService);

  authService.$inject = ["$log", "$http", "tokenService", "$state"];

  function authService($log, $http, token, $state) {

    var service = {
      currentUser: currentUser,
      currentUserTokenData: currentUserTokenData,
      isLoggedIn: isLoggedIn,
      login: login,
      logout: logout,
      refreshToken: refreshToken
    };

    return service;

    function currentUser() {

      var user = $http({
        method: "GET",
        url: "/api/users/me",
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(response) {
        $log.info(response.data);
        return response.data; // current user
      });

      return user;
    }

    function currentUserTokenData() {
      var tokenData = token.decode();

      $log.info("current user retrieved:", tokenData);

      return tokenData;
    }

    function isLoggedIn() {
      return token.retrieve() != null;
    }

    function login(data) {
      $log.info("auth service // login");
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
