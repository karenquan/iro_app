(function() {
  "use strict";

  angular
    .module("app")
    .config(routes);

  routes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function routes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url:          "/",
        templateUrl:  "/js/app/home/home.html",
        controller:   "HomeController",
        controllerAs: "vm"
      })
      .state("color", {
        url:          "/colors/{hex}",
        templateUrl:  "/js/app/colors/color.html",
        controller:   "ColorsController",
        controllerAs: "vm"
      })
      .state("palette", {
        url:          "/palettes/{id}",
        templateUrl:  "/js/app/palettes/palette.html",
        controller:   "PalettesController",
        controllerAs: "vm"
      })
      .state("profile", {
        url:         "/profile",
        templateUrl: "js/app/users/profile.html"
      })
      .state("login", {
        url:          "/login",
        templateUrl:  "/js/app/login/login.html",
        controller:   "LoginController",
        controllerAs: "vm"
      })
      .state("signup", {
        url:          "/signup",
        templateUrl:  "/js/app/signup/signup.html",
        controller:   "SignUpController",
        controllerAs: "vm"
      });

    $urlRouterProvider.otherwise("/");
  }
})();
