(function() {
  "use strict";

  angular
    .module("app")
    .controller("CustomPaletteListController", CustomPaletteListController);

  CustomPaletteListController.$inject = ["$log", "authService", "userService"];

  function CustomPaletteListController($log, authService, userService) {
    var vm = this;

    // BINDINGS
    vm.removeCustomPalette = removeCustomPalette;
    vm.paletteList;

    getCustomPalettes();

    // FUNCTIONS
    function getCustomPalettes() {
      authService.currentUser()
      .then(function(res) {
        var currentUser = res;
        vm.paletteList = currentUser.customPalettes;
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }

    function removeCustomPalette(paletteId) {
      $log.info("cusom palette id to remove:", paletteId);
      userService
        .removeCustomPalette(paletteId)
        .then(function(res) {
          getCustomPalettes();
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
