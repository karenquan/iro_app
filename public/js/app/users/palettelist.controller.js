(function() {
  "use strict";

  angular
    .module("app")
    .controller("PaletteListController", PaletteListController);

  PaletteListController.$inject = ["$log", "authService", "userService", "$state"];

  function PaletteListController($log, authService, userService, $state) {
    var vm = this;
    var listId = $state.params.id;

    vm.paletteList;
    vm.updatedPaletteListName;
    vm.updatePaletteListName = updatePaletteListName;

    getPaletteList();

    function getPaletteList() {
      authService.currentUser()
      .then(function(res) {
        var currentUser = res;
        var filteredList = currentUser.paletteLists.filter(function(list) {
          return list._id == listId;
        });
        $log.info(filteredList);
        vm.paletteList = filteredList[0];
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }

    function updatePaletteListName(listId) {
      $log.info(listId);
      userService
        .updatePaletteListName(listId, vm.updatedPaletteListName)
        .then(function(res) {
          getPaletteList();
          vm.updatedPaletteListName = "";
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
