(function(){
  'use strict';

  var shoppingList = ["Ronaldo", "Messi", "Neymar", "Griezman"];

  angular.module('ShoppingListApp',[])
  .controller('ShoppingListController', ShoppingListController);

  ShoppingListController.$inject = ['$scope'];
  function ShoppingListController($scope){
    $scope.shoppingList = shoppingList;
  }
})();
