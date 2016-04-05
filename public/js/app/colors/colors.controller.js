(function() {
  "use strict";

  angular
    .module("app")
    .controller("ColorsController", ColorsController);

  ColorsController.$inject = ["$log", "colorService", "$http", "tokenService", "authService"];

  function ColorsController($log, colorService, $http, token, authService) {
    var vm = this;

    // BINDINGS
    vm.addColorToList = addColorToList; //pass id of selected list item
    vm.color;
    vm.currentUserColorLists;
    vm.selectedListId;

    getColor();
    getCurrentUserColorLists();


    // FUNCTIONS
    function addColorToList() {
      var data = {
        listId: vm.selectedListId,
        color: vm.color
      };
      $log.info(data);

      $http({
        method: "POST",
        url: "/api/users/me/addColorToList",
        data: data,
        headers: {
          "authorization": "bearer " + token.retrieve()
        }
      }, function(res) {
        $log.info('successfully added color', res);
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
        // $log.info(response);
        vm.color = response; //color object
        }, function(error) {
          $log.error(error);
        }
      );
    }
  }
})();
