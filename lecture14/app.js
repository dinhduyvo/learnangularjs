(function(){
  'use strict';
  angular.module('WatcherApp',[])
  .controller('WatcherController', WatcherController);

  WatcherController.$inject = ['$scope'];
  function WatcherController($scope){

    $scope.counterOne = 0;
    $scope.counter = 0;

    $scope.showWatchers = function(){
      console.log("# of watchers: ", $scope.$$watchersCount);
    }

    $scope.countOne = function(){
      $scope.counterOne = 1;
    }
    $scope.countMany = function(){
      $scope.counter++;
    }

    $scope.$watch(function(){
      console.log('Digest desired!');
    })

    // $scope.$watch('counterOne', function (newValue, oldValue){
    //   console.log('Counter one old value: ', oldValue);
    //   console.log('Counter one new value: ', newValue);
    // })
    // $scope.$watch('counter', function (newValue, oldValue){
    //   console.log('Counter many old value: ', oldValue);
    //   console.log('Counter many new value: ', newValue);
    // })
  }

})();
