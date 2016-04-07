(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "tokenService", "authService", "userService", "palettesService", "$stateParams"];

  function ColorsController($log, colorService, token, authService, userService, palettesService, $stateParams) {
    var vm = this;

    // BINDINGS
    vm.addColorToList = addColorToList;
    vm.color;
    vm.currentUserColorLists;
    vm.palettes;
    vm.selectedListId;

    if(authService.isLoggedIn()) {
      getCurrentUserColorLists();
    }
    getColor();
    getPalettes();

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

    function getPalettes() {
      palettesService
        .getPalettesByHex($stateParams.hex, 1, 10)
        .then(function(res) {
          vm.palettes = res; // palettes with current colors
        }, function(error) {

        });
    }
  }
})();
