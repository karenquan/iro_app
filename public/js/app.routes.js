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
      .state("colorSearch", {
        url:          "/search/colors/{hex}",
        templateUrl:  "/js/app/colors/colorsearch.html",
        controller:   "ColorSearchController",
        controllerAs: "vm"
      })
      .state("palette", {
        url:          "/palettes/{id}",
        templateUrl:  "/js/app/palettes/palette.html",
        controller:   "PalettesController",
        controllerAs: "vm"
      })
      .state("paletteSearch", {
        url:          "/search/palettes/{hex}?num?page",
        templateUrl:  "/js/app/palettes/palettesearch.html",
        controller:   "PaletteSearchController",
        controllerAs: "vm"
      })
      .state("profile", {
        url:          "/profile",
        templateUrl:  "js/app/users/profile.html",
        controller:   "ProfileController",
        controllerAs: "vm",
        authorized:   true
      })
      .state("colorList", {
        url:          "/profile/colorlists/{id}",
        templateUrl:  "js/app/users/colorlist.html",
        controller:   "ColorListController",
        controllerAs: "vm",
        authorized:   true
      })
      .state("paletteList", {
        url:          "/profile/palettelists/{id}",
        templateUrl:  "js/app/users/palettelist.html",
        controller:   "PaletteListController",
        controllerAs: "vm",
        authorized:   true
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

  angular
    .module("app")
    .run(authorizeRoutes);

  authorizeRoutes.$inject = ["$state", "authService", "$rootScope"];

  function authorizeRoutes($state, authService, $rootScope) {
    $rootScope.$on("$stateChangeStart", function(event, destination) {
      if(destination.authorized && !authService.isLoggedIn()) {
        $state.go("login");
        event.preventDefault();
      }
    });
  }
})();
