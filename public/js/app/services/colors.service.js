(function() {
  "use strict";

  angular
    .module("app")
    .factory("colorService", colorService);

  colorService.$inject = ["$log", "$http", "$stateParams"];

  function colorService($log, $http, $stateParams) {
    $log.info('up in da color service');

    var service = {
      getColor: getColor,
      getTopColors: getTopColors
    };

    function getColor() {
      var hex = $stateParams.hex;
      var color = {};
      $http({
        method: "GET",
        url: "/api/colors/" + hex
      })
      .then(function(res){
        return res.data[0]; // color object
      }, function(error) {
        $log.error(error);
      });
    }

    function getTopColors() {

    }

    return service;
  }
})();
