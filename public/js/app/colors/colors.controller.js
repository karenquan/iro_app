(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService"];

  function ColorsController($log, colorService) {
    var vm = this;

    vm.color;
    getColor();

    function getColor() {
      colorService
        .getColor()
        .then(function(response){
        // $log.info(response);
        vm.color = response; //color object
        }, function(error) {
          $log.error(error);
        }
      );
    }
  }
})();
