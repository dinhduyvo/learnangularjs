(function () {
  'use trict';

  angular.module('MenuApp')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'ApiBasePath', '$q'];
  function MenuDataService($http, ApiBasePath, $q){
    var service = this;
    var categories = [];

    var menuItems = [];

    service.getAllCategories = function () {

      var deferred = $q.defer();
      var result = {
        message: ""
      };

      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/categories.json")
      }).then(function (result) {
          categories = [];

          result.data.forEach(function (item) {
            categories.push(item);
          });

          //console.log(categories);
          if(categories.length > 0){
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

    service.getItemsForCategory = function (categoryShortName) {

      var deferred = $q.defer();
      var result = {
        message: ""
      };

      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
        params: {
          category: categoryShortName
        }
      }).then(function (result) {
          menuItems = [];

          result.data.menu_items.forEach(function (item) {
            menuItems.push(item);
          });

          console.log("Items count: ", menuItems);

          if(menuItems.length > 0){
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
    }

    service.getMenuItems = function(){
      return menuItems;
    }

  }
})();
