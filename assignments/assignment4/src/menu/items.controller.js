(function () {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsController', ItemsController);

  ItemsController.$inject = ['MenuDataService', '$stateParams'];
  function ItemsController(MenuDataService, $stateParams) {
    var itemsList = this;

    var promise1 = MenuDataService.getItemsForCategory($stateParams.categoryShortName);
    promise1.then(function () {
      itemsList.menuItems = MenuDataService.getMenuItems();
    }).catch(function(error){
      menu.title = "Nothing found!";
      menu.items = [];
    });

    itemsList.catName = $stateParams.categoryShortName;
    console.log("CatName: ", itemsList.catName);
    console.log("New Menu items: ", itemsList.menuItems);
  }
})();
