(function() {
  "use strict";

  angular
    .module("app")
    .factory("palettesService", palettesService);

  palettesService.$inject = ["$log", "$http", "$stateParams", "tokenService"];

  function palettesService($log, $http, $stateParams, token) {
    var service = {
      addPaletteToList: addPaletteToList,
      getTopPalettes: getTopPalettes,
      getPalette: getPalette
    };

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

    function getTopPalettes() {
      var topPalettes = $http({
        method: "GET",
        url: "/palettes/top"
      }).then(function(response) {
        return response.data;
      });

      return topPalettes;
    }

    function getPalette() {
      var id = $stateParams.id;

      var palette = $http({
        method: "GET",
        url: "/palettes/" + id
      })
      .then(function(response) {
        return response.data[0]; // palette object
      });

      return palette;
    }

    return service;
  }
})();
