(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "tokenService", "authService", "userService"];

  function ColorsController($log, colorService, token, authService, userService) {
    var vm = this;

    // BINDINGS
    vm.addColorToList = addColorToList;
    vm.color;
    vm.currentUserColorLists;
    vm.selectedListId;

    getColor();
    if(authService.isLoggedIn()) {
      getCurrentUserColorLists();
    }

    // FUNCTIONS
    function addColorToList() {
      userService
        .addColorToList(vm.selectedListId, vm.color)
        .then(function(res) {
          $log.info("colors controller // successfully add color to list");
        }, function(error) {
          $log.error(error);
        });
    }

    function getCurrentUserColorLists() {
      authService.currentUser()
      .then(function(response) {
        var user = response;
        vm.currentUserColorLists = user.colorLists;
      }, function(error) {
        $log.error(error);
      });
    }

    function getColor() {
      colorService
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
