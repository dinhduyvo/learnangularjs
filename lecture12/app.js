(function(){
  'use strict';
  angular.module('MsgApp',[])
  .controller('MsgController', MsgController);

  MsgController.$inject = ['$scope', '$filter'];
  function MsgController($scope, $filter){
    $scope.name = "DinhDuyVo";
    $scope.stateOfBeing = "hungry";
    $scope.cookieCost = .45;

    $scope.sayMessage = function(){
      var message = "I would like to eat Pizza!";
      var output = $filter('uppercase')(message);
      return output;
    }

    $scope.feedYaakov = function () {
      $scope.stateOfBeing = "fed";
    };
  }
})();
