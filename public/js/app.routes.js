(function() {
  "use strict";

  angular
    .module("app")
    .config(routes);

  routes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/js/app/layouts/home.html"
      })
      .state("colors", {
        url: "/colors",
        templateUrl: "/js/app/colors/colors.html"
      })
      .state("palettes", {
        url: "/palettes",
        templateUrl: "/js/app/palettes/palettes.html"
      });

    $urlRouterProvider.otherwise("/");
  }
})();
