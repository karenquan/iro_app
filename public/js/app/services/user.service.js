(function() {
  "use strict";

  angular
    .module("app")
    .factory("userService", userService);

    userService.$inject = ["$log", "$http", "authService", "tokenService"];

    function userService($log, $http, authService, token) {
      $log.info("user service loaded");
      var service = {
        addColorToList:      addColorToList,
        addPaletteToList:    addPaletteToList,
        create:              create,
        createColorList:     createColorList,
        createCustomPalette: createCustomPalette,
        createPaletteList:   createPaletteList,
        removeColor:         removeColor,
        removeColorList:     removeColorList,
        removePalette:       removePalette,
        removePaletteList:   removePaletteList
      };

      return service;

      function addColorToList(listId, color) {
        var data = {
          listId: listId,
          color: color
        };

        var promise = $http({
          method: "POST",
          url: "/api/users/me/addColorToList",
          data: data,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successfully added color to list");
        });

        return promise;
      }

      function addPaletteToList(listId, palette) {
        var data = {
          listId: listId,
          palette: palette
        };
        var promise = $http({
          method: "POST",
          url: "/api/users/me/addPaletteToList",
          data: data,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(response) {
          $log.info("successfully added palette to list");
        });

        return promise;
      }

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

      function createCustomPalette(palette) {
        // var data = {
        //   name: name,
        //   colors: colors
        // };

        var promise = $http({
          method: "POST",
          url: "/api/users/me/createCustomPalette",
          data: palette,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successful custom palette creation");
        }, function(error) {
          $log.error(error);
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
          $log.info("successful palette list creation");
        });

        return promise;
      }

      function removeColor(colorListId, colorId) {
        var data = {
          colorListId: colorListId,
          colorId: colorId
        };
        $log.info(data);
        var promise = $http({
          method: "DELETE",
          url: "/api/users/me/removeColor",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successful color removal");
        });

        return promise;
      }

      function removeColorList(listId) {
        var data = {
          listId: listId
        };

        $log.info("remove color list data: ", data);

        var promise = $http({
          method: "DELETE",
          url: "/api/users/me/removeColorList",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successful color list removal");
        });

        return promise;
      }

      function removePalette(paletteListId, paletteId) {
        var data = {
          paletteListId: paletteListId,
          paletteId: paletteId
        };

        $log.info("remove palette list data", data);

        var promise = $http({
          method: "DELETE",
          url: "/api/users/me/removePalette",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("successful palette list removal");
        });

        return promise;
      }

      function removePaletteList(listId) {
        var data = {
          listId: listId
        };

        var promise = $http({
          method: "DELETE",
          url: "/api/users/me/removePaletteList",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          $log.info("success palette list removal");
        });

        return promise;
      }
    }
})();
