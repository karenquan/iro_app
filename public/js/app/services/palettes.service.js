(function() {
  "use strict";

  angular
    .module("app")
    .factory("palettesService", palettesService);

  palettesService.$inject = ["$log", "$http", "$stateParams"];

  function palettesService($log, $http, $stateParams) {
    var service = {
      getTopPalettes: getTopPalettes,
      getPalette: getPalette
    };

    function getTopPalettes() {

    }

    function getPalette() {
      var id = $stateParams.id;

      var palette = $http({
        method: "GET",
        url: "/api/palettes/" + id
      })
      .then(function(response) {
        // $log.info(response.data[0]);
        return response.data[0]; // palette object
      });

      return palette;
    }

    return service;
  }
})();
