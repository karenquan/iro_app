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
      .state("color", {
        url: "/colors/{id}",
        templateUrl: "/js/app/colors/color.html"
      })
      .state("palette", {
        url: "/palettes/{id}",
        templateUrl: "/js/app/palettes/palette.html"
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
