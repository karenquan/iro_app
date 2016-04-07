(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorListController", ColorListController);

  ColorListController.$inject = ["$log", "$state", "authService", "tokenService", "userService"];

  function ColorListController($log, $state, authService, token, userService) {
    var vm = this;

    var listId = $state.params.id;
    vm.colorList;
    vm.removeColor         = removeColor;
    vm.updateColorListName = updateColorListName;

    getColorList();

    function getColorList() {
      authService.currentUser()
      .then(function(res) {
        var currentUser = res;
        var filteredList = currentUser.colorLists.filter(function(list) {
          return list._id == listId;
        });
        vm.colorList = filteredList[0];
        $log.info(vm.colorList);
      }, function(error) {
        $log.info("error in user retrieval");
      });
    }

    function updateColorListName(listId) {
      userService
        .updateColorListName(listId, vm.updatedColorListName)
        .then(function(res) {
          $log.info("profile controller // updated color list title");
          getColorList();
          vm.updatedColorListName = "";
        }, function(error) {
          $log.error(error);
        });
    }

    function removeColor(colorListId, colorId) {
      userService
        .removeColor(colorListId, colorId)
        .then(function(res) {
          $log.info("profile controller // removed color");
          getColorList();
        }, function(error) {
          $log.error(error);
        });
    }
  }
})();
