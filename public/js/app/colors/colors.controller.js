(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService"];

  function ColorsController($log, colorService) {
    var vm = this;

    vm.color = colorService.getColor();

    // NEED TO FIX -- MAKE SURE COLOR IS GETTING RETURNED FROM SERVICE
    $log.info('COLOR', vm.color);
  }
})();
