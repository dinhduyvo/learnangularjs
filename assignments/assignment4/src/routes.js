(function () {
  'use strict';

  angular.module("MenuApp")
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("home", {
      url: '/',
      templateUrl: 'src/menu/templates/home.template.html'
    })

    .state("categoriesList", {
      url: "/categories-list",
      templateUrl: 'src/menu/templates/categories.template.html',
      controller: 'CategoriesController as categoriesList',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    .state('categoriesList.itemsList', {
      url: '/items-list/{categoryShortName}',
      templateUrl: 'src/menu/templates/items.template.html',
      controller: "ItemsController as itemsList"
    });
  }
})();
