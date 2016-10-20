(function () {
  'use trict';

  angular.module('MenuSearchApp', [])
    .controller('MenuSearchController', MenuSearchController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
    .directive("menuSearch", MenuSearchDirective);

  function MenuSearchDirective(){
    var ddo = {
      templateUrl: 'founditems.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      }
    };

    return ddo;
  }

  MenuSearchController.$inject = ['MenuSearchService'];
  function MenuSearchController(MenuSearchService){
    var menu = this;
    var promise = MenuSearchService.getMenuCategories();

    menu.keyword = "";

    menu.title = "";

    menu.doSearch = function(){
      menu.searchCategories = [];
      console.log(menu.keyword);

      promise.then(function(response){

        menu.allCategories = response.data;
        //console.log(response.data);

        menu.allCategories.forEach(function (item) {
          if(item.special_instructions.indexOf(menu.keyword)) {
            MenuSearchService.addFoundItem(item);
          }
          // console.log(item.special_instructions);
        });
      });

      menu.title = " (" + MenuSearchService.getCount() + " categories )";
      console.log(menu.title);
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath){
    var service = this;
    var searchCategories = [];

    service.getMenuCategories = function(shortname){
      
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      });

      return response;
    };

    service.addFoundItem = function (data){
      searchCategories.push(data);
    };

    service.getCount = function () {
      return searchCategories.length;
    }
  }
})();
