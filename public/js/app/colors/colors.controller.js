(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "tokenService", "authService", "userService", "palettesService", "$stateParams", "$timeout"];

  function ColorsController($log, colorService, token, authService, userService, palettesService, $stateParams, $timeout) {
    var vm = this;

    // BINDINGS
    vm.addedColor     = false;
    vm.addColorToList = addColorToList;
    vm.color;
    vm.currentUserColorLists;
    vm.fade           = false;
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
          vm.addedColor = true;
          $timeout(function() {
              vm.addedColor = false;
          }, 3000)
          .then(function() {
            vm.fade = true;
          });
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
          $log.error(error);
        });
    }
  }
})();
