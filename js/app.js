(function (){
  'use strict';
    angular.module('myFirstApp',[])

    .controller('MyFirstController', function($scope){
      $scope.name = "Duy";
      $scope.doAbc = function(){
        return "Hello Coursera!";
      };
    });
})();
