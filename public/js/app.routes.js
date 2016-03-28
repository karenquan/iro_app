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
        templateUrl: "/js/app/home/home.html",
        controller: "HomeController",
        controllerAs: "vm"
      })
      .state("colors", {
        url: "/colors",
        templateUrl: "/js/app/colors/colors.html"
      })
      .state("palettes", {
        url: "/palettes",
        templateUrl: "/js/app/palettes/palettes.html"
      })
      .state("profile", {
        url: "/profile",
        templateUrl: "js/app/users/profile.html"
      })
      .state("login", {
        url: "/login",
        templateUrl: "/js/app/layouts/login.html"
      });

    $urlRouterProvider.otherwise("/");
  }
})();
