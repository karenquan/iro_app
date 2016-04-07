(function() {
  "use strict";

  angular
    .module("app")
    .controller("AppController", AppController);

  AppController.$inject = ["$rootScope", "$log", "$http"];

  function AppController($rootScope, $log, $http) {
    var vm = this;

    $rootScope.$on("$viewContentLoading", function(event, toState, toParams, fromState, fromParams){
      angular.element(document.body).addClass("loading");
    });

    $rootScope.$on("$viewContentLoaded", function(event, toState, toParams, fromState, fromParams){
      angular.element(document.body).removeClass("loading");
    });
  }
})();
