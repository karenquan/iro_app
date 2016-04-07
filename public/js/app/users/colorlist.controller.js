(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorListController", ColorListController);

  ColorListController.$inject = ["$log", "$state", "authService", "tokenService"];

  function ColorListController($log, $state, authService, token) {
    var vm = this;

    var listId = $state.params.id;
    vm.colorList;

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
  }
})();
