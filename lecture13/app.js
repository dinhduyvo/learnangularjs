(function(){
  'use strict';
  angular.module('MsgApp',[])
  .controller('MsgController', MsgController)
  .filter('loves', LovesFilter)
  .filter('truth', TruthFilter);

  MsgController.$inject = ['$scope', 'lovesFilter'];
  function MsgController($scope,  lovesFilter){
    $scope.name = "DinhDuyVo";
    $scope.stateOfBeing = "hungry";
    $scope.cookieCost = .45;

    $scope.sayMessage = function(){
      var message = "I would likes to eat Pizza!";
      return message;
    }

    $scope.sayLoveMessage = function(){
      var message = "I would likes to eat Pizza!";
      message = lovesFilter(message);
      return message;
    }

    $scope.feedYaakov = function () {
      $scope.stateOfBeing = "fed";
    };
  }

  function LovesFilter() {
    return function(input){
      input = input || "";
      input = input.replace("likes", "loves");
      return input;
    }
  }

  function TruthFilter(){
    return function(input, target, replace) {
      input = input || "";
      input = input.replace(target, replace);
      return input;
    }
  }
})();
