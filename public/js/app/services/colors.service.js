(function() {
  "use strict";

  angular
    .module("app")
    .factory("colorService", colorService);

  colorService.$inject = ["$log", "$http", "$stateParams", "tokenService"];

  function colorService($log, $http, $stateParams, token) {
    $log.info('color service loaded');

    var service = {
      getColor:       getColor,
      getTopColors:   getTopColors,
    };

    function getColor() {
      var hex = $stateParams.hex;

      var color = $http({
        method: "GET",
        url: "/colors/" + hex
      })
      .then(function(res){
        return res.data[0]; //color object
      });

      return color;
    }

    function getTopColors() {
      var topColors = $http({
        method: "GET",
        url: "/colors/top"
      })
      .then(function(res) {
        return res.data; //top colors object
      });

      return topColors;
    }

    return service;
  }
})();
