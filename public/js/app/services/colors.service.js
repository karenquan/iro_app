(function() {
  "use strict";

  angular
    .module("app")
    .factory("colorService", colorService);

  colorService.$inject = ["$log", "$http", "$stateParams", "tokenService"];

  function colorService($log, $http, $stateParams, token) {
    $log.info('color service loaded');

    var service = {
      addColorToList: addColorToList,
      getColor:       getColor,
      getTopColors:   getTopColors,
    };

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
