(function () {
  'use trict';

  angular.module('MenuSearchApp', [])
    .controller('MenuSearchController', MenuSearchController)
    .service('MenuSearchService', MenuSearchService)
    .directive("menuSearch", MenuSearchDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  function MenuSearchDirective(){
    var ddo = {
      templateUrl: 'founditems.html'
    };

    return ddo;
  }

  MenuSearchController.$inject = ['MenuSearchService'];
  function MenuSearchController(MenuSearchService){
    var menu = this;
    menu.keyword = "";

    menu.title = "";
    menu.items = [];

    menu.doSearch = function(response){
      if (menu.keyword) {
        var promise1 = MenuSearchService.doSearch(menu.keyword);
        promise1.then(function (response) {

          menu.items = MenuSearchService.getFoundItems();
          if(menu.items.length > 0) {
            menu.title = "Found items:  (" + MenuSearchService.getCount() + " categories found)";
          }
          else {
            menu.title = "Nothing found!";
            menu.items = [];
          }
        }).catch(function(error){
          menu.title = "Nothing found!";
          menu.items = [];
        });
      }
      else{
        menu.title = "Nothing found!";
        menu.items = [];
      }
    };

    menu.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
      if(menu.items.length > 0) {
        menu.title = "Found items:  (" + menu.items.length + " categories found)";
      }
      else {
        menu.title = "Nothing found!";
      }
      menu.items = MenuSearchService.getFoundItems();
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q'];
  function MenuSearchService($http, ApiBasePath, $q){
    var service = this;
    var searchCategories = [];

    service.doSearch = function(keyword){
      var deferred = $q.defer();
      var result = {
        message: ""
      };

      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
          searchCategories = [];
          result.data.menu_items.forEach(function (item) {
              if(item.description.indexOf(keyword) !==-1
                  || item.name.indexOf(keyword) !==-1
                  || item.short_name.indexOf(keyword) !==-1) {
                searchCategories.push(item);
                console.log("Found: " + item.name);
                console.log(searchCategories.length);
              }
          });
          if(searchCategories.length > 0){
            deferred.resolve(result);
          }
          else{
            deferred.reject(result);
          }
        })
        .catch(function(error){
          console.log("Something wrong!");
        });
        return deferred.promise;
    };

    service.removeItem = function (itemIndex) {
      searchCategories.splice(itemIndex, 1);
    }

    service.getFoundItems = function (){
      return searchCategories;
    }

    service.addFoundItem = function (data){
      searchCategories.push(data);
    };

    service.getCount = function () {
      return searchCategories.length;
    }
  }
})();
