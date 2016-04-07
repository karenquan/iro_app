(function() {
  "use strict";

  angular
    .module("app")
    .controller("AppController", AppController);

  AppController.$inject = ["$rootScope", "$log"];

  function AppController($rootScope, $log) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      angular.element(document.body).addClass("loading");
    });

    $rootScope.$on('$viewContentLoaded', function(event, toState, toParams, fromState, fromParams){
      angular.element(document.body).removeClass("loading");
    });
  }
})();
