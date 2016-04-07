(function() {
  "use strict";

  angular
    .module("app")
    .factory("userService", userService);

    userService.$inject = ["$log", "$http", "authService", "tokenService"];

    function userService($log, $http, authService, token) {

      var service = {
        addColorToList:        addColorToList,
        addPaletteToList:      addPaletteToList,
        create:                create,
        createColorList:       createColorList,
        createCustomPalette:   createCustomPalette,
        createPaletteList:     createPaletteList,
        removeColor:           removeColor,
        removeColorList:       removeColorList,
        removeCustomPalette:   removeCustomPalette,
        removePalette:         removePalette,
        removePaletteList:     removePaletteList,
        showColorList:         showColorList,
        updateColorListName:   updateColorListName,
        updatePaletteListName: updatePaletteListName
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
        });

        return promise;
      }

      function createCustomPalette(palette) {
        var promise = $http({
          method: "POST",
          url: "/api/users/me/createCustomPalette",
          data: palette,
          headers: {
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
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
        });

        return promise;
      }

      function removeColor(colorListId, colorId) {
        var data = {
          colorListId: colorListId,
          colorId: colorId
        };
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
        });

        return promise;
      }

      function removeCustomPalette(paletteId) {
        var data = {
          paletteId: paletteId
        };

        var promise = $http({
          method: "DELETE",
          url: "/api/users/me/removeCustomPalette",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
        });

        return promise;
      }

      function removePalette(paletteListId, paletteId) {
        var data = {
          paletteListId: paletteListId,
          paletteId: paletteId
        };

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
        });

        return promise;
      }

      function showColorList(listId) {
        var data = {
          listId: listId
        };
        var promise = $http({
          method: "GET",
          url: "/api/users/me/showColorList",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
          return res;
        });

        return promise;
      }

      function updateColorListName(listId, listName) {
        var data = {
          listId: listId,
          listName: listName
        };

        var promise = $http({
          method: "PUT",
          url: "/api/users/me/updateColorListName",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
        });

        return promise;
      }

      function updatePaletteListName(listId, listName) {
        var data = {
          listId: listId,
          listName: listName
        };

        var promise = $http({
          method: "PUT",
          url: "/api/users/me/updatePaletteListName",
          data: data,
          headers: {
            "Content-Type": "application/json",
            "authorization": "bearer " + token.retrieve()
          }
        })
        .then(function(res) {
        });

        return promise;
      }
    }
})();
