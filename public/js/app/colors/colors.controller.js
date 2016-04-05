(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "tokenService", "authService", "userService"];

  function ColorsController($log, colorService, token, authService, userService) {
    var vm = this;

    // BINDINGS
    vm.authService    = authService;
    vm.addColorToList = addColorToList;
    vm.color;
    vm.colorService   = colorService;
    vm.currentUserColorLists;
    vm.selectedListId;
    vm.userService = userService;

    getColor();
    getCurrentUserColorLists();

    // FUNCTIONS
    function addColorToList() {
      vm.userService
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
