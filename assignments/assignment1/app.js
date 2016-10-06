(function(){
  'use strict';
  angular.module('CheckIfTooMuchApp',[])
  .controller('CheckIfTooMuchController', function($scope){
    $scope.foods = "";
    $scope.checkResult = "";
    $scope.textColor = "black";

    $scope.doCheck = function(){
      var result = checkIfTooMuch($scope.foods);
      $scope.checkResult = result;
    }

    function checkIfTooMuch(string){

      // not counting an 'empty' item towards the count
      while (string.match(/(,\s*,)|(,\s*$)/g)) {
        string = string.replace(/,\s*,/gi,',');
        string = string.replace(/,\s*$/gi,'');
      }

      // If the textbox is empty
      if (string.trim().length == 0) {
        $scope.textColor = "red";
        return "Please enter data first";
      }

      $scope.textColor = "green";
      var splitData = string.split(',');

      // If the number of items in the textbox
      // is less than or equal to 3
      if(splitData.length <= 3) {
        return "Enjoy!";
      }
      return "Too much!";
    }
  })
})();
