(function() {
  "use strict";

  angular
    .module("app")
    .factory("palettesService", palettesService);

  palettesService.$inject = ["$log", "$http", "$stateParams", "tokenService"];

  function palettesService($log, $http, $stateParams, token) {
    var service = {
      getTopPalettes:        getTopPalettes,
      getPalette:            getPalette,
      getPalettesByHex:      getPalettesByHex
    };

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

    function getPalettesByHex(hex) {
      var palettes = $http({
        method: "GET",
        url: "/search/palettes/" + hex
      })
      .then(function(response) {
        $log.info(response);
        return response.data; // array of palettes
      });

      return palettes;
    }

    return service;
  }
})();
