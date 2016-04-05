(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "tokenService", "authService"];

  function ColorsController($log, colorService, token, authService) {
    var vm = this;

    // BINDINGS
    vm.authService    = authService;
    vm.addColorToList = addColorToList; //pass id of selected list item
    vm.color;
    vm.colorService   = colorService;
    vm.currentUserColorLists;
    vm.selectedListId;

    getColor();
    getCurrentUserColorLists();

    // FUNCTIONS
    function addColorToList() {
      vm.colorService
        .addColorToList(vm.selectedListId, vm.color)
        .then(function(res) {
          $log.info("colors controller // successfully add color to list");
        }, function(error) {
          $log.error(error);
        });
    }

    function getCurrentUserColorLists() {
      vm.authService.currentUser()
      .then(function(response) {
        var user = response;
        vm.currentUserColorLists = user.colorLists;
      }, function(error) {
        $log.error(error);
      });
    }

    function getColor() {
      vm.colorService
        .getColor()
        .then(function(response){
        vm.color = response; //color object
        }, function(error) {
          $log.error(error);
        }
      );
    }
  }
})();
