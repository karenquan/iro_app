(function() {
  "use strict";

  angular
    .module("app")
    .factory("colorService", colorService);

  colorService.$inject = ["$log", "$http", "$stateParams", "tokenService"];

  function colorService($log, $http, $stateParams, token) {

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

    function getTopColors(num) {
      var topColors = $http({
        method: "GET",
        url: "/colors/top?num=" + num
      })
      .then(function(res) {
        return res.data; //top colors object
      });

      return topColors;
    }

    return service;
  }
})();
