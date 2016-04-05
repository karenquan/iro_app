(function() {
  "use strict";

  angular
    .module("app")
    .factory("userService", userService);

    userService.$inject = ["$log", "$http", "authService", "tokenService"];

    function userService($log, $http, authService, token) {
      $log.info("user service loaded");
      var service = {
        create: create,
        createColorList: createColorList,
        createPaletteList: createPaletteList,
        removeColorFromList: removeColorFromList
      };

      return service;

      function create(data) {
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

      function createColorList(user, listName) {
        var data = {
          name: listName
        };

        var promise = $http({
          method: "POST",
          url: "/api/users/me/createColorList",
          data: data,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successful color list creation", res);
        });

        return promise;
      }

      function createPaletteList(listName) {
        var data = {
          name: listName
        };

        var promise = $http({
          method: "POST",
          url: "/api/users/me/createPaletteList",
          data: data,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res){
          $log.info("successful palette list creation:", res);
        });

        return promise;
      }

      function removeColorFromList(colorListId, colorId) {
        var data = {
          colorListId: colorListId,
          colorId: colorId
        };
        $log.info(data);
        var promise = $http({
          method: "DELETE",
          url: "/api/users/me/removeColorFromList",
          data: data,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successful color removal");
        });

        return promise;
      }
    }
})();
