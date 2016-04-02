(function() {
  "use strict";

  angular
    .module("app")
    .factory("colorService", colorService);

  colorService.$inject = ["$log", "$http", "$stateParams"];

  function colorService($log, $http, $stateParams) {
    $log.info('color service loaded');

    var service = {
      getColor: getColor,
      getTopColors: getTopColors
    };

    function getColor() {
      var hex = $stateParams.hex;

      var color = $http({
        method: "GET",
        url: "/api/colors/" + hex
      })
      .then(function(res){
        // $log.info(res.data[0]);
        return res.data[0]; //color object
      });

      return color;
    }

    // NEED TO WRITE THIS FUNCTION
    function getTopColors() {

    }

    return service;
  }
})();
