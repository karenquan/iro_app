(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "authService", "$http", "tokenService"];

  function ColorsController($log, colorService, authService, $http, token) {
    var vm = this;

    vm.color;
    vm.currentUserColors;

    getColor();
    getCurrentUserColors();

    function getCurrentUserColors() {
      var currentUserTokenData = authService.currentUser();
      $log.info("current user for colors:", currentUserTokenData);
      $http({
        method: "GET",
        url: "/api/users/me",
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(response) {
        $log.info(response.data);
        var user = response.data;
        vm.currentUserColors = user.colorLists;
      }, function(error) {

      });
    }

    function getColor() {
      colorService
        .getColor()
        .then(function(response){
        // $log.info(response);
        vm.color = response; //color object
        }, function(error) {
          $log.error(error);
        }
      );
    }
  }
})();
