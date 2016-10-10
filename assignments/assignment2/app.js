(function(){
  'use strict';
  angular.module('CheckOffApp',[])
  .controller('ToBuyController',  ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  // To buy controller
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService){
    var toBuyList = this;
    toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

    toBuyList.moveToBought = function (index) {
      ShoppingListCheckOffService.moveToBought(index);
    }
  }

  // Already bought controller
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService){
    var boughtList = this;
    boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
  }

  // Service 
  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems = [
      {name: "Cookies", quantity: "30"},
      {name : "Pananas", quantity : "5"},
      {name : "Vegetables", quantity : "10"},
      {name : "Computers", quantity : "1"},
      {name : "Washing Machine", quantity : "2"}
    ];
    var boughtItems = [];

    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getBoughtItems = function() {
      return boughtItems;
    };

    service.moveToBought = function (index){
      var item = toBuyItems[index];
      boughtItems.push(item);

      toBuyItems.splice(index, 1);
    };
  }
})();
