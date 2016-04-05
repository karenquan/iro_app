(function() {
  "use strict";

  angular
    .module("app")
    .controller("PalettesController", PalettesController);

  PalettesController.$inject = ["$log", "$http", "palettesService", "tokenService", "authService"];

  function PalettesController($log, $http, palettesService, token, authService) {
    var vm = this;

    // BINDINGS
    vm.addPaletteToList = addPaletteToList;
    vm.currentUserPaletteLists;
    // vm.getCurrentUserPaletteLists;
    vm.palette;

    getPalette();
    getCurrentUserPaletteLists();

    // FUNCTIONS
    function addPaletteToList() {
      var data = {
        listId: vm.selectedListId,
        palette: vm.palette
      };
      $log.info(data);
      $http({
        method: "POST",
        url: "/api/users/me/addPaletteToList",
        data: data,
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      })
      .then(function(res) {
        $log.info('added palette to list:', res);
      }, function(error) {
        $log.error(error);
      });
    }

    function getCurrentUserPaletteLists() {
      authService.currentUser()
      .then(function(response) {
        $log.info(response);
        var user = response;
        vm.currentUserPaletteLists = user.paletteLists;
      }, function(error) {
        $log.error(error);
      });
    }

    function getPalette() {
      palettesService
        .getPalette()
        .then(function(response) {
          $log.info(response);
          vm.palette = response;
        }, function(error) {
          $log.error(error);
        }
      );
    }
  }
})();
